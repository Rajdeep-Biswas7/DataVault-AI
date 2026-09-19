import React, { useEffect, useRef } from "react";

interface CyberBackgroundProps {
  theme: "light" | "dark";
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 12000), 80);
    const colors =
      theme === "light"
        ? ["#0284c7", "#6366f1", "#0d9488", "#8b5cf6"]
        : ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: theme === "light" ? Math.random() * 0.35 + 0.15 : Math.random() * 0.5 + 0.2,
      });
    }

    interface FloatingCode {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
    }
    const codes: FloatingCode[] = [];
    const codeWords = [
      "ZK_VERIFIED", "DISCLOSE()", "COMPACT_v0.34", "PREPROD",
      "PRIVATE_WITNESS", "0x4f3c", "ENCLAVE_ACTIVE", "ZERO_DATA_LEAK"
    ];
    for (let i = 0; i < 18; i++) {
      codes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: codeWords[Math.floor(Math.random() * codeWords.length)],
        speed: Math.random() * 0.35 + 0.1,
        opacity: theme === "light" ? Math.random() * 0.12 + 0.04 : Math.random() * 0.18 + 0.05,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw floating code strings
      ctx.font = "10px JetBrains Mono, monospace";
      codes.forEach((c) => {
        c.y += c.speed;
        if (c.y > height + 20) {
          c.y = -20;
          c.x = Math.random() * width;
        }
        ctx.fillStyle =
          theme === "light"
            ? `rgba(2, 132, 199, ${c.opacity})`
            : `rgba(6, 182, 212, ${c.opacity})`;
        ctx.fillText(c.text, c.x, c.y);
      });

      // 2. Draw neural particle mesh
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gentle repulsion
        const dxMouse = p.x - mouseX;
        const dyMouse = p.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 110) {
          p.x += (dxMouse / distMouse) * 1.5;
          p.y += (dyMouse / distMouse) * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        const pulsedAlpha = p.alpha * (0.8 + 0.2 * Math.sin(time + i));
        ctx.fillStyle = p.color;
        ctx.globalAlpha = pulsedAlpha;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha =
              (1 - dist / 130) * (theme === "light" ? 0.12 : 0.18);
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500">
      {/* Radiant Atmospheric Glow Orbs */}
      {theme === "light" ? (
        <>
          <div className="absolute top-[-10%] left-[10%] w-[650px] h-[650px] bg-cyan-200/40 rounded-full blur-[140px]" />
          <div className="absolute top-[25%] right-[-5%] w-[700px] h-[700px] bg-indigo-200/35 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[25%] w-[750px] h-[750px] bg-sky-100/60 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e120_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        </>
      ) : (
        <>
          <div className="absolute top-[-15%] left-[10%] w-[600px] h-[600px] bg-cyan-600/12 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute top-[30%] right-[-10%] w-[650px] h-[650px] bg-indigo-600/12 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-15%] left-[30%] w-[700px] h-[700px] bg-purple-700/10 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.12)_2px,rgba(0,0,0,0.12)_4px)] opacity-25 pointer-events-none" />
        </>
      )}

      {/* Dynamic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
