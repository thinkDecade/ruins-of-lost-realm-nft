'use client';

import React, { useEffect, useRef } from "react";

const PortalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create particles with additional magical properties
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      // Colors based on new palette
      const colors = ['#F8A61A', '#6936C8', '#3B6BE1', '#9C6722'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: 0,
        pulseSpeed: 0.03 + Math.random() * 0.02,
      };
    };

    const initParticles = () => {
      // More particles for a denser magical atmosphere
      for (let i = 0; i < 150; i++) {
        particles.push(createParticle());
      }
    };

    // Draw magical runes in the background
    const drawRunes = () => {
      ctx.save();
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 20, y + 20);
        ctx.strokeStyle = '#F8A61A'; // Updated to Luminous Gold
        ctx.stroke();
      }
      ctx.restore();
    };

    const animate = () => {
      // Create a dark dungeon atmosphere with new gradients
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0B0F2E');  // Deep Cosmic Blue
      gradient.addColorStop(0.5, '#1C1F50'); // Mystic Indigo
      gradient.addColorStop(1, '#080C1A');   // Void Black
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a subtle magical glow effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
      glowGradient.addColorStop(0, 'rgba(248, 166, 26, 0.1)'); // Luminous Gold
      glowGradient.addColorStop(1, 'rgba(105, 54, 200, 0.05)'); // Electric Purple
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw magical runes
      drawRunes();

      // Animate particles
      particles.forEach((particle) => {
        particle.pulse += particle.pulseSpeed;
        const size = particle.size * (1 + Math.sin(particle.pulse) * 0.2);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        
        // Create a magical glow effect for each particle
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          size * 2
        );
        particleGradient.addColorStop(0, `${particle.color}`);
        particleGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = particleGradient;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap particles around the screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        background: "linear-gradient(to bottom, #0B0F2E, #1C1F50, #080C1A)",
        filter: "contrast(1.1) saturate(1.2)"
      }}
    />
  );
};

export default PortalBackground;