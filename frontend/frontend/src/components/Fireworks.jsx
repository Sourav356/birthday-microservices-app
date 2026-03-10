import React, { useEffect, useRef } from 'react';

export default function Fireworks({ show }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!show || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let animationId;

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.99;
        this.gravity = 0.05;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
      update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
        this.draw();
      }
    }

    const colors = ['#ff0043', '#14fc56', '#1e7fff', '#e60aff', '#ffae00'];

    function createFirework(x, y) {
      const particleCount = 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.03) {
        createFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.5
        );
      }

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => p.update());
    }

    animate();

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [show]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}