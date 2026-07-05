import React, { useRef, useEffect } from "react";

interface ElectricBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  children?: React.ReactNode;
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  borderRadius?: string;
  className?: string;
  glow?: boolean;
}

export default function ElectricBorder({
  children,
  colors = ["#10b981", "#3b82f6", "#10b981"],
  duration = 4,
  borderWidth = 2,
  borderRadius = "24px",
  className = "",
  glow = true,
  ...props
}: ElectricBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = Date.now();

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);
      if (w === 0 || h === 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const elapsed = (Date.now() - startTime) / 1000;
      const progress = (elapsed % duration) / duration;
      const angle = progress * Math.PI * 2;

      // Extract numeric radius
      const radius = parseFloat(borderRadius) || 0;

      ctx.save();
      ctx.lineWidth = borderWidth;

      // Create conic gradient centered in the canvas
      const gradient = ctx.createConicGradient(angle, w / 2, h / 2);
      colors.forEach((color, idx) => {
        gradient.addColorStop(idx / (colors.length - 1), color);
      });

      // Draw the glow layer first
      if (glow) {
        ctx.shadowColor = colors[0];
        ctx.shadowBlur = 12;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = borderWidth + 1;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(
            borderWidth / 2,
            borderWidth / 2,
            w - borderWidth,
            h - borderWidth,
            radius
          );
        } else {
          ctx.rect(
            borderWidth / 2,
            borderWidth / 2,
            w - borderWidth,
            h - borderWidth
          );
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // Draw the main sharp gradient line
      ctx.strokeStyle = gradient;
      ctx.lineWidth = borderWidth;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(
          borderWidth / 2,
          borderWidth / 2,
          w - borderWidth,
          h - borderWidth,
          radius
        );
      } else {
        ctx.rect(
          borderWidth / 2,
          borderWidth / 2,
          w - borderWidth,
          h - borderWidth
        );
      }
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [colors, duration, borderWidth, borderRadius, glow]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ borderRadius }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
