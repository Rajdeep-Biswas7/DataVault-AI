import React, { useEffect, useRef } from "react";

export const CyberBackground: React.FC = () => {
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

    // Particle nodes definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const colors = ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Cryptographic symbols floating
    interface HexSymbol {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
    }
    const hexSymbols: HexSymbol[] = [];
    const hexSnippets = [
      "0x4f3c", "ZK_SNARK", "MIDNIGHT", "COMPACT", "DISCLOSE",
      "W_KEY", "SHA-256", "PREPROD", "CIRCUIT", "ENCLAVE", "0x8168"
    ];
    for (let i = 0; i < 20; i++) {
      hexSymbols.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: hexSnippets[Math.floor(Math.random() * hexSnippets.length)],
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.18 + 0.05,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw floating cryptographic hex text
      ctx.font = "10px monospace";
      hexSymbols.forEach((s) => {
        s.y += s.speed;
        if (s.y > height + 20) {
          s.y = -20;
          s.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(6, 182, 212, ${s.opacity})`;
        ctx.fillText(s.text, s.x, s.y);
      });

      // 2. Update and draw particles with neural connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction: gentle repulsion
        const dxMouse = p.x - mouseX;
        const dyMouse = p.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120) {
          p.x += (dxMouse / distMouse) * 1.5;
          p.y += (dyMouse / distMouse) * 1.5;
        }

        // Draw particle node
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
            ctx.globalAlpha = (1 - dist / 130) * 0.18;
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
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Cyber Ambient Glow Gradients */}
      <div className="absolute top-[-15%] left-[10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute top-[30%] right-[-10%] w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-15%] left-[30%] w-[700px] h-[700px] bg-purple-700/10 rounded-full blur-[160px]" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      {/* Dynamic HTML5 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* High-tech Subtle Scanline Filter */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] opacity-30 pointer-events-none" />
    </div>
  );
};
