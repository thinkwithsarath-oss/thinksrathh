import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export interface Lead {
  id?: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  created_at?: Date;
}

class DatabaseService {
  private pool: mysql.Pool | null = null;

  isEnvConfigured(): boolean {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const name = process.env.DB_NAME;
    return !!(host && user && name);
  }

  getPool(): mysql.Pool {
    if (!this.pool) {
      if (!this.isEnvConfigured()) {
        throw new Error("MySQL environment variables (DB_HOST, DB_USER, DB_NAME) are not fully configured.");
      }
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "3306", 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }
    return this.pool;
  }

  async verifyOrCreateLeadsTable(): Promise<boolean> {
    if (!this.isEnvConfigured()) {
      console.warn("DatabaseService: Environment variables not configured. Skipping table creation.");
      return false;
    }
    try {
      const pool = this.getPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      console.log("DatabaseService: 'leads' table verified/created successfully.");
      return true;
    } catch (err: any) {
      console.error("DatabaseService: Failed to verify/create 'leads' table:", err.message);
      return false;
    }
  }

  async getLeadsCount(): Promise<number> {
    if (!this.isEnvConfigured()) return 0;
    try {
      const pool = this.getPool();
      const [rows]: any = await pool.query("SELECT COUNT(*) as count FROM leads");
      return rows[0]?.count || 0;
    } catch (err: any) {
      console.error("DatabaseService: Failed to fetch leads count:", err.message);
      return 0;
    }
  }

  async insertLead(lead: Lead): Promise<boolean> {
    if (!this.isEnvConfigured()) return false;
    try {
      const pool = this.getPool();
      await pool.query(
        "INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)",
        [lead.name, lead.email, lead.phone, lead.message || ""]
      );
      return true;
    } catch (err: any) {
      console.error("DatabaseService: Failed to insert lead into 'leads' table:", err.message);
      return false;
    }
  }

  async testConnection(): Promise<{ connected: boolean; message: string }> {
    if (!this.isEnvConfigured()) {
      return { connected: false, message: "MySQL environment variables are not configured in .env" };
    }
    try {
      const pool = this.getPool();
      await pool.query("SELECT 1");
      return { connected: true, message: "Successfully connected to MySQL database." };
    } catch (err: any) {
      return { connected: false, message: err.message || "Connection failed." };
    }
  }
}

export const databaseService = new DatabaseService();
