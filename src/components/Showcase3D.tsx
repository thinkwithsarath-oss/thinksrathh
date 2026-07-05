import React, { useEffect, useRef, useState } from "react";
import { SERVICES, Service } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, Cpu, MapPin, Search, MousePointerClick, ChevronRight, CornerDownRight } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  z: number;
  tx: number; // Target x
  ty: number; // Target y
  tz: number; // Target z
  color: string;
  size: number;
  opacity: number;
}

export default function Showcase3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeShape, setActiveShape] = useState<"sphere" | "helix" | "grid" | "orbits">("sphere");
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // 3D rotation angles
  const angleXRef = useRef(0.01);
  const angleYRef = useRef(0.01);
  const targetAngleXRef = useRef(0.005);
  const targetAngleYRef = useRef(0.005);
  
  // Drag start coords
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  
  // Mouse interactive coords
  const mouseRef = useRef({ x: 0, y: 0, z: 0 });
  const particlesRef = useRef<Particle[]>([]);
  
  const PARTICLE_COUNT = 300;

  // Initialize particles
  useEffect(() => {
    const pts: Particle[] = [];
    
    // Create base positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Base sphere coordinate creation
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 160; // Sphere radius
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      // Determine colors (luxurious green-white variants)
      const rand = Math.random();
      let color = "#10b981"; // Emerald
      if (rand > 0.7) color = "#ffffff"; // Pure white
      else if (rand > 0.4) color = "#6ee7b7"; // Mint/Sage green
      else if (rand > 0.1) color = "#047857"; // Deep forest
      
      pts.push({
        x: x + (Math.random() - 0.5) * 50,
        y: y + (Math.random() - 0.5) * 50,
        z: z + (Math.random() - 0.5) * 50,
        tx: x,
        ty: y,
        tz: z,
        color,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }
    
    particlesRef.current = pts;
  }, []);

  // Update target particle positions based on state
  useEffect(() => {
    const pts = particlesRef.current;
    if (!pts || pts.length === 0) return;

    if (activeShape === "sphere") {
      // Morph back to a uniform sphere
      pts.forEach((p, i) => {
        const u = i / PARTICLE_COUNT;
        const theta = u * 2 * Math.PI * 15.5; // spiral coordinate mapping
        const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
        const r = 160;
        
        p.tx = r * Math.sin(phi) * Math.cos(theta);
        p.ty = r * Math.sin(phi) * Math.sin(theta);
        p.tz = r * Math.cos(phi);
      });
    } else if (activeShape === "helix") {
      // Morph into a double helix DNA strand representing AI datasets (GEO / AEO)
      pts.forEach((p, i) => {
        const strand = i % 2 === 0 ? 0 : Math.PI;
        const t = (i / PARTICLE_COUNT) * Math.PI * 4; // 2 complete loops
        const r = 80;
        
        p.tx = r * Math.cos(t + strand);
        p.ty = (i - PARTICLE_COUNT / 2) * 1.6; // Vertical spread
        p.tz = r * Math.sin(t + strand);
      });
    } else if (activeShape === "grid") {
      // Morph into a structural web/wireframe plane representing Web Dev and GMB mapping
      const size = Math.ceil(Math.sqrt(PARTICLE_COUNT));
      pts.forEach((p, i) => {
        const r = Math.floor(i / size);
        const c = i % size;
        const spacing = 22;
        
        p.tx = (c - size / 2) * spacing;
        p.ty = (r - size / 2) * spacing;
        p.tz = Math.sin(r * 0.5 + c * 0.5) * 20; // 3D wave ripple on the plane
      });
    } else if (activeShape === "orbits") {
      // Morph into concentric circles (Paid Ads target orbits)
      pts.forEach((p, i) => {
        const ringIndex = i % 3; // 3 distinct campaign rings
        const radius = (ringIndex + 1) * 60;
        const countInRing = PARTICLE_COUNT / 3;
        const theta = ((i % countInRing) / countInRing) * Math.PI * 2;
        
        p.tx = radius * Math.cos(theta);
        p.ty = (Math.random() - 0.5) * 15; // Slightly flat organic thickness
        p.tz = radius * Math.sin(theta);
      });
    }
  }, [activeShape]);

  // Main animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Resize observer
    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = 420 * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `420px`;
        
        width = canvas.width;
        height = canvas.height;
      }
    };
    
    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const pxRatio = window.devicePixelRatio || 1;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Update rotation angles with smoothing towards targets
      angleXRef.current += (targetAngleXRef.current - angleXRef.current) * 0.1;
      angleYRef.current += (targetAngleYRef.current - angleYRef.current) * 0.1;
      
      // Rotate coordinates matrices
      const cosX = Math.cos(angleXRef.current);
      const sinX = Math.sin(angleXRef.current);
      const cosY = Math.cos(angleYRef.current);
      const sinY = Math.sin(angleYRef.current);
      
      // Gentle auto-spin when idle
      if (!isDragging) {
        targetAngleYRef.current += 0.003;
        targetAngleXRef.current = Math.sin(Date.now() * 0.0002) * 0.2;
      }

      const pts = particlesRef.current;
      if (pts) {
        // Draw grid connections in background for technical feel (if Grid/Orbits active)
        if (activeShape === "grid") {
          ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
          ctx.lineWidth = 0.5 * pxRatio;
          const size = Math.ceil(Math.sqrt(PARTICLE_COUNT));
          for (let r = 0; r < size - 1; r++) {
            for (let c = 0; c < size - 1; c++) {
              const i1 = r * size + c;
              const i2 = r * size + (c + 1);
              const i3 = (r + 1) * size + c;
              
              if (pts[i1] && pts[i2] && pts[i3]) {
                const p1 = project3D(pts[i1], cosX, sinX, cosY, sinY, centerX, centerY, pxRatio);
                const p2 = project3D(pts[i2], cosX, sinX, cosY, sinY, centerX, centerY, pxRatio);
                const p3 = project3D(pts[i3], cosX, sinX, cosY, sinY, centerX, centerY, pxRatio);
                
                if (p1.visible && p2.visible) {
                  ctx.beginPath();
                  ctx.moveTo(p1.sx, p1.sy);
                  ctx.lineTo(p2.sx, p2.sy);
                  ctx.stroke();
                }
                if (p1.visible && p3.visible) {
                  ctx.beginPath();
                  ctx.moveTo(p1.sx, p1.sy);
                  ctx.lineTo(p3.sx, p3.sy);
                  ctx.stroke();
                }
              }
            }
          }
        } else if (activeShape === "orbits") {
          // Draw orbital pathways
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.lineWidth = 1 * pxRatio;
          [60, 120, 180].forEach(r => {
            ctx.beginPath();
            // Draw a flat circle in rotated 3D space
            for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
              const dummyPt = { x: r * Math.cos(angle), y: 0, z: r * Math.sin(angle), tx: 0, ty: 0, tz: 0, color: "", size: 1, opacity: 1 };
              const projected = project3D(dummyPt, cosX, sinX, cosY, sinY, centerX, centerY, pxRatio);
              if (angle === 0) {
                ctx.moveTo(projected.sx, projected.sy);
              } else {
                ctx.lineTo(projected.sx, projected.sy);
              }
            }
            ctx.closePath();
            ctx.stroke();
          });
        } else if (activeShape === "sphere") {
          // Draw a soft glowing core glow
          const radialGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 150 * pxRatio);
          radialGlow.addColorStop(0, "rgba(4, 120, 87, 0.08)");
          radialGlow.addColorStop(0.5, "rgba(16, 185, 129, 0.03)");
          radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = radialGlow;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 150 * pxRatio, 0, Math.PI * 2);
          ctx.fill();
        }

        // Sort particles by depth (Z index) so back particles are drawn behind
        const projectedPts = pts.map(p => {
          // Smooth interpolating transition towards the morph target
          p.x += (p.tx - p.x) * 0.08;
          p.y += (p.ty - p.y) * 0.08;
          p.z += (p.tz - p.z) * 0.08;
          
          return {
            p,
            ...project3D(p, cosX, sinX, cosY, sinY, centerX, centerY, pxRatio)
          };
        });

        projectedPts.sort((a, b) => b.depth - a.depth);

        // Draw individual particles
        projectedPts.forEach(({ p, sx, sy, size, visible, depth }) => {
          if (!visible) return;
          
          // Render particle with depth fogging (opacity drops in distance)
          const normDepth = (depth + 220) / 440; // 0 to 1 scale
          const opacity = Math.max(0.05, Math.min(1.0, (1 - normDepth) * p.opacity));
          
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity;
          
          ctx.beginPath();
          ctx.arc(sx, sy, size * (1.5 - normDepth), 0, Math.PI * 2);
          ctx.fill();
          
          // Draw subtle connector web for nearby nodes (interactive network)
          if (activeShape === "sphere" && depth < 0 && Math.random() < 0.05) {
            projectedPts.slice(0, 5).forEach(neighbor => {
              const dx = sx - neighbor.sx;
              const dy = sy - neighbor.sy;
              const dist = Math.sqrt(dx*dx + dy*dy);
              if (dist < 65 * pxRatio) {
                ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
                ctx.lineWidth = 0.5 * pxRatio;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(neighbor.sx, neighbor.sy);
                ctx.stroke();
              }
            });
          }
        });
        
        ctx.globalAlpha = 1.0;
      }
      
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [activeShape, isDragging]);

  // Transform 3D coordinate to 2D screen coordinate with camera math
  const project3D = (
    p: Particle,
    cosX: number,
    sinX: number,
    cosY: number,
    sinY: number,
    centerX: number,
    centerY: number,
    pxRatio: number
  ) => {
    // Rotation on Y axis
    let x1 = p.x * cosY - p.z * sinY;
    let z1 = p.x * sinY + p.z * cosY;
    
    // Rotation on X axis
    let y2 = p.y * cosX - z1 * sinX;
    let z2 = p.y * sinX + z1 * cosX;
    
    // Simple perspective projection
    const fov = 350;
    const perspective = fov / (fov + z2);
    
    return {
      sx: centerX + x1 * perspective * pxRatio,
      sy: centerY + y2 * perspective * pxRatio,
      size: p.size * perspective * pxRatio,
      depth: z2,
      visible: z2 > -fov
    };
  };

  // Mouse drag handles
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseX.current = e.clientX;
    lastMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      mouseRef.current = { x: mx, y: my, z: 0 };
    }

    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouseX.current;
    const deltaY = e.clientY - lastMouseY.current;
    
    targetAngleYRef.current += deltaX * 0.01;
    targetAngleXRef.current += deltaY * 0.01;
    
    lastMouseX.current = e.clientX;
    lastMouseY.current = e.clientY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true);
      lastMouseX.current = e.touches[0].clientX;
      lastMouseY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    
    const deltaX = e.touches[0].clientX - lastMouseX.current;
    const deltaY = e.touches[0].clientY - lastMouseY.current;
    
    targetAngleYRef.current += deltaX * 0.015;
    targetAngleXRef.current += deltaY * 0.015;
    
    lastMouseX.current = e.touches[0].clientX;
    lastMouseY.current = e.touches[0].clientY;
  };

  // Maps which services triggers which shape
  const triggerShapeForService = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return;
    setSelectedService(service);
    
    if (["seo", "seo_consult"].includes(serviceId)) {
      setActiveShape("sphere");
    } else if (["aeo", "geo", "dm_consult"].includes(serviceId)) {
      setActiveShape("helix");
    } else if (["webdev", "gmb"].includes(serviceId)) {
      setActiveShape("grid");
    } else {
      setActiveShape("orbits");
    }
  };

  // Render icons for shape trigger
  const getShapeIcon = (shapeName: string) => {
    switch (shapeName) {
      case "sphere": return <Search className="w-4 h-4 text-emerald-400" />;
      case "helix": return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case "grid": return <Cpu className="w-4 h-4 text-emerald-400" />;
      case "orbits": return <Compass className="w-4 h-4 text-emerald-400" />;
      default: return <Search className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div id="interactive-showcase" className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950 p-6 md:p-12 rounded-3xl border border-zinc-900/60 shadow-2xl overflow-hidden">
      {/* Absolute luxurious background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Left side: Interactive Canvas */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[440px]">
        {/* Quick hint */}
        <div className="absolute top-2 left-4 flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full z-10 pointer-events-none">
          <MousePointerClick className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">Drag to Orbit / Select to Morph</span>
        </div>

        {/* 3D Core projection Canvas container */}
        <div 
          ref={containerRef} 
          className="w-full h-[420px] relative cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>

        {/* Morph selection controllers at the bottom of the canvas */}
        <div className="flex flex-wrap justify-center gap-3 mt-2 z-10">
          {[
            { id: "sphere", label: "Organic Core", icon: "sphere" },
            { id: "helix", label: "AI Synapse", icon: "helix" },
            { id: "grid", label: "Web Matrix", icon: "grid" },
            { id: "orbits", label: "Ad Targeting", icon: "orbits" },
          ].map(shape => (
            <button
              id={`shape-btn-${shape.id}`}
              key={shape.id}
              onClick={() => {
                setActiveShape(shape.id as any);
                // Auto align matching service
                if (shape.id === "sphere") setSelectedService(SERVICES.find(s => s.id === "seo")!);
                if (shape.id === "helix") setSelectedService(SERVICES.find(s => s.id === "aeo")!);
                if (shape.id === "grid") setSelectedService(SERVICES.find(s => s.id === "webdev")!);
                if (shape.id === "orbits") setSelectedService(SERVICES.find(s => s.id === "gads")!);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 border ${
                activeShape === shape.id
                  ? "bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {getShapeIcon(shape.icon)}
              {shape.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right side: Interactive Service Details Deck */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full bg-zinc-900/20 p-6 md:p-8 rounded-2xl border border-zinc-900">
        <div className="space-y-6">
          {/* Service Selector pills */}
          <div className="flex flex-wrap gap-1.5 pb-4 border-b border-zinc-800">
            {SERVICES.slice(0, 7).map(s => (
              <button
                id={`service-select-btn-${s.id}`}
                key={s.id}
                onClick={() => triggerShapeForService(s.id)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono font-medium uppercase tracking-widest transition-all ${
                  selectedService.id === s.id
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Category tag */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">{selectedService.category}</span>
              </div>

              {/* Service Title */}
              <h3 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight">
                {selectedService.title}
              </h3>

              {/* Service Description */}
              <p className="text-zinc-400 text-sm leading-relaxed">
                {selectedService.description}
              </p>

              {/* Metric Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-transparent border-l-2 border-emerald-500 space-y-1">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Expected Outcome</span>
                <p className="font-serif text-lg text-emerald-300 font-medium">{selectedService.metrics}</p>
              </div>

              {/* Service Delivery Points */}
              <div className="space-y-2 pt-2">
                <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                  <CornerDownRight className="w-3 h-3 text-emerald-500" />
                  Premium Deliverables
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {selectedService.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="mt-1 text-emerald-400 font-mono">0{index + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Luxury context statement */}
              <p className="text-[11px] italic text-emerald-400/80 pt-2 border-t border-zinc-900 font-serif leading-relaxed">
                💡 <strong className="not-italic text-zinc-300">Bespoke luxury alignment:</strong> {selectedService.luxuryContext}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA link connected back to contact */}
        <div className="pt-6 mt-6 border-t border-zinc-900 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Pricing Bracket</p>
            <p className="text-xs text-white">Custom Portfolio Strategy</p>
          </div>
          <a
            href="#inquire"
            className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-white transition-colors group"
          >
            Request Private Audit
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
