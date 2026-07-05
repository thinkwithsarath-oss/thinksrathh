import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { databaseService } from "./DatabaseService";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONFIG_FILE = path.join(process.cwd(), "db_config.json");

// Helper to load DB configuration with fallbacks
function getDbConfig() {
  let config = {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
  };

  // If a local persistent config file exists (updated via UI), prefer it
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const fileData = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      config = { ...config, ...fileData };
    } catch (err) {
      console.error("Failed to parse db_config.json:", err);
    }
  }

  return config;
}

// Global active pool and connection status
let dbPool: mysql.Pool | null = null;
let tablesInitialized = false;

// Initialize MySQL pool lazily
async function getPool(): Promise<mysql.Pool> {
  const config = getDbConfig();
  
  if (!config.host || !config.user || !config.database) {
    throw new Error("Database connection parameters are not fully configured. Please configure host, user, and database.");
  }

  // Create a pool if it doesn't exist
  if (!dbPool) {
    dbPool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return dbPool;
}

// Reset the active pool (called when configuration changes)
async function resetPool() {
  if (dbPool) {
    await dbPool.end();
    dbPool = null;
  }
  tablesInitialized = false;
}

// Automatic Table Creation and Schema Synchronization
async function ensureTablesExist(pool: mysql.Pool) {
  if (tablesInitialized) return;

  try {
    console.log("Checking and automatically creating database tables...");

    // Create contact_inquiries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        brand_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        industry VARCHAR(100),
        message TEXT,
        investment INT,
        channels VARCHAR(255),
        goal VARCHAR(100),
        traffic VARCHAR(100),
        budget_tier VARCHAR(100),
        appointment_date VARCHAR(50),
        appointment_time VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Create blog_drafts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_drafts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        prompt TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    tablesInitialized = true;
    console.log("Database tables verified and auto-created successfully.");
  } catch (err) {
    console.error("Error during automatic table creation:", err);
    throw err;
  }
}

// --- DATABASE AND APP API ENDPOINTS ---

// Check database connection status and credentials (masked)
app.get("/api/db/status", async (req, res) => {
  const config = getDbConfig();
  const hasConfig = !!(config.host && config.user && config.database);

  if (!hasConfig) {
    return res.json({
      connected: false,
      configured: false,
      message: "Database credentials are not yet configured.",
      config: {
        host: config.host || "",
        port: config.port,
        user: config.user || "",
        database: config.database || "",
        hasPassword: !!config.password,
      }
    });
  }

  try {
    const pool = await getPool();
    // Test the connection by running a simple query
    await pool.query("SELECT 1");
    // Ensure tables exist automatically
    await ensureTablesExist(pool);

    res.json({
      connected: true,
      configured: true,
      message: "Successfully connected to MySQL database and verified schemas.",
      config: {
        host: config.host,
        port: config.port,
        user: config.user,
        database: config.database,
        hasPassword: !!config.password,
      }
    });
  } catch (err: any) {
    res.json({
      connected: false,
      configured: true,
      message: err.message || "Failed to connect to the database.",
      config: {
        host: config.host,
        port: config.port,
        user: config.user,
        database: config.database,
        hasPassword: !!config.password,
      }
    });
  }
});

// Update database credentials dynamically via the UI
app.post("/api/db/config", async (req, res) => {
  const { host, port, user, password, database } = req.body;

  if (!host || !user || !database) {
    return res.status(400).json({
      success: false,
      message: "Host, user, and database fields are required."
    });
  }

  const newConfig = {
    host,
    port: parseInt(port || "3306", 10),
    user,
    password: password || "",
    database
  };

  try {
    // Write new configuration to local persistent file
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2), "utf-8");
    
    // Reset pool so next call uses new credentials
    await resetPool();

    // Test new pool connection
    const pool = await getPool();
    await pool.query("SELECT 1");
    await ensureTablesExist(pool);

    res.json({
      success: true,
      message: "Configuration saved, connection verified, and tables auto-created!"
    });
  } catch (err: any) {
    res.json({
      success: true, // Configuration saved successfully but connection verification failed
      connectionError: err.message || "Saved config successfully, but connection test failed. Please verify credentials in phpMyAdmin.",
      message: "Configuration saved to db_config.json, but connection test failed."
    });
  }
});

// Reset configuration back to environment variables
app.post("/api/db/reset", async (req, res) => {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
    }
    await resetPool();
    res.json({ success: true, message: "Database configuration reset to environment defaults." });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Save advisory/contact inquiries (with fallback to memory if DB not connected)
const inMemoryInquiries: any[] = [];

app.post("/api/contact", async (req, res) => {
  const inquiry = {
    brand_name: req.body.brand_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    industry: req.body.industry || "General",
    message: req.body.message || "",
    investment: parseInt(req.body.investment || "0", 10),
    channels: Array.isArray(req.body.channels) ? req.body.channels.join(", ") : (req.body.channels || ""),
    goal: req.body.goal || "",
    traffic: req.body.traffic || "",
    budget_tier: req.body.budget_tier || "",
    appointment_date: req.body.appointment_date || "",
    appointment_time: req.body.appointment_time || "",
    created_at: new Date()
  };

  try {
    const pool = await getPool();
    await ensureTablesExist(pool);

    const query = `
      INSERT INTO contact_inquiries (
        brand_name, email, phone_number, industry, message, investment, channels,
        goal, traffic, budget_tier, appointment_date, appointment_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      inquiry.brand_name,
      inquiry.email,
      inquiry.phone_number,
      inquiry.industry,
      inquiry.message,
      inquiry.investment,
      inquiry.channels,
      inquiry.goal,
      inquiry.traffic,
      inquiry.budget_tier,
      inquiry.appointment_date,
      inquiry.appointment_time
    ];

    const [result]: any = await pool.query(query, values);
    
    // Also save to leads table via DatabaseService if configured
    if (databaseService.isEnvConfigured()) {
      await databaseService.insertLead({
        name: inquiry.brand_name,
        email: inquiry.email,
        phone: inquiry.phone_number,
        message: inquiry.message || `Goal: ${inquiry.goal}. Budget: ${inquiry.budget_tier}. Appointment: ${inquiry.appointment_date} ${inquiry.appointment_time}`
      }).catch(err => console.error("Failed to insert lead via DatabaseService in /api/contact:", err));
    }
    
    return res.json({
      success: true,
      savedToDb: true,
      insertId: result.insertId,
      message: "Advisory inquiry saved directly to your live MySQL database."
    });
  } catch (err: any) {
    console.warn("MySQL connection unavailable or failed. Falling back to local state storage:", err.message);
    
    // Save to in-memory fallback
    inMemoryInquiries.unshift(inquiry);

    return res.json({
      success: true,
      savedToDb: false,
      message: "Inquiry received! Note: Stored in high-performance memory cache since MySQL connection is pending setup.",
      errorDetails: err.message
    });
  }
});

// Retrieve contact/advisory inquiries
app.get("/api/contact", async (req, res) => {
  try {
    const pool = await getPool();
    await ensureTablesExist(pool);

    const [rows]: any = await pool.query("SELECT * FROM contact_inquiries ORDER BY created_at DESC");
    return res.json({
      success: true,
      source: "database",
      data: rows
    });
  } catch (err: any) {
    return res.json({
      success: true,
      source: "memory_cache",
      data: inMemoryInquiries,
      message: "Serving cached inquiries. Setup live MySQL/phpMyAdmin credentials to persist permanently."
    });
  }
});

// In-memory fallback for blog drafts
const inMemoryDrafts: any[] = [];

// Save blog drafts
app.post("/api/drafts", async (req, res) => {
  const draft = {
    title: req.body.title,
    category: req.body.category || "General",
    prompt: req.body.prompt || "",
    content: req.body.content || "",
    created_at: new Date()
  };

  try {
    const pool = await getPool();
    await ensureTablesExist(pool);

    const [result]: any = await pool.query(
      "INSERT INTO blog_drafts (title, category, prompt, content) VALUES (?, ?, ?, ?)",
      [draft.title, draft.category, draft.prompt, draft.content]
    );

    return res.json({
      success: true,
      savedToDb: true,
      insertId: result.insertId,
      message: "AI Blog post draft saved directly to MySQL."
    });
  } catch (err: any) {
    inMemoryDrafts.unshift(draft);
    return res.json({
      success: true,
      savedToDb: false,
      message: "AI Blog post draft generated and stored in memory cache.",
      errorDetails: err.message
    });
  }
});

// Retrieve blog drafts
app.get("/api/drafts", async (req, res) => {
  try {
    const pool = await getPool();
    await ensureTablesExist(pool);

    const [rows]: any = await pool.query("SELECT * FROM blog_drafts ORDER BY created_at DESC");
    return res.json({
      success: true,
      source: "database",
      data: rows
    });
  } catch (err: any) {
    return res.json({
      success: true,
      source: "memory_cache",
      data: inMemoryDrafts
    });
  }
});

// Delete an inquiry
app.delete("/api/contact/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.query("DELETE FROM contact_inquiries WHERE id = ?", [id]);
    res.json({ success: true, message: "Inquiry deleted successfully from MySQL." });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Diagnostics endpoint for DatabaseView component
app.get("/api/db/diagnostics", async (req, res) => {
  const isConfigured = databaseService.isEnvConfigured();
  if (!isConfigured) {
    return res.json({
      isConfigured: false,
      connected: false,
      leadsCount: 0,
      message: "MySQL environment variables are not fully configured in the .env file."
    });
  }

  try {
    const connectionTest = await databaseService.testConnection();
    // Also make sure table is initialized if connected
    if (connectionTest.connected) {
      await databaseService.verifyOrCreateLeadsTable();
    }
    const leadsCount = await databaseService.getLeadsCount();
    return res.json({
      isConfigured: true,
      connected: connectionTest.connected,
      leadsCount,
      message: connectionTest.message
    });
  } catch (err: any) {
    return res.json({
      isConfigured: true,
      connected: false,
      leadsCount: 0,
      message: err.message || "Diagnostics check failed."
    });
  }
});

// Vite & Static file serving integration
async function startServer() {
  // Automatically verify or create 'leads' table upon application initialization
  try {
    if (databaseService.isEnvConfigured()) {
      console.log("DatabaseService: Initializing database on application start...");
      await databaseService.verifyOrCreateLeadsTable();
    } else {
      console.log("DatabaseService: DB_HOST, DB_USER, or DB_NAME not configured. Skipping auto-table setup.");
    }
  } catch (err: any) {
    console.error("DatabaseService: Auto-initialization error:", err.message);
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
