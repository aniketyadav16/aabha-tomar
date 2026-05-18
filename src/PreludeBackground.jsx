import React, { useEffect, useRef } from 'react';

const PreludeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let heartParticles = [];
    let starParticles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // --- HEART PARTICLE CLASS (Floating Lanterns) ---
    class HeartParticle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 4 + 2; // Slightly larger for prelude
        this.speedY = Math.random() * 0.8 + 0.3; // Slower float
        this.alpha = Math.random() * 0.6 + 0.2;
        this.baseX = this.x;
        this.phase = Math.random() * Math.PI * 2; // For gentle swaying
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // --- ADDING THE GLOW (ILLUMINATING EFFECT) ---
        ctx.shadowBlur = this.size * 2.5; // Intensive glow
        ctx.shadowColor = '#ffebee'; // Softer glowing edge color
        
        ctx.fillStyle = '#ffcdd2'; // Soft pale rose/cream color
        ctx.beginPath();
        // Simple canvas heart
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x, this.y, this.x - this.size, this.y, this.x - this.size, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x - this.size, this.y + this.size, this.x, this.y + this.size * 1.5, this.x, this.y + this.size * 2);
        ctx.bezierCurveTo(this.x, this.y + this.size * 1.5, this.x + this.size, this.y + this.size, this.x + this.size, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x + this.size, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.y -= this.speedY;
        this.x = this.baseX + Math.sin(this.phase) * 10; // Sway effect
        this.phase += 0.01;

        if (this.y < -30) { // Off screen top
          this.reset();
        }
        this.draw();
      }
    }

    // --- STAR PARTICLE CLASS (SHOOTING STARS) ---
    class StarParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5 - canvas.height * 0.3; // Start near top
        this.speedY = Math.random() * 5 + 3; // Fast fall
        this.speedX = Math.random() * 4 - 2; // Subtle angle
        this.length = Math.random() * 30 + 15; // Length of streak
        this.alpha = 1;
        this.color = '#fffbe0'; // Soft bright star color
        this.tailAlphaDecay = Math.random() * 0.015 + 0.008; // How fast trail fades
        this.life = Math.random() * 300 + 150; // Max lifetime in frames
      }

      draw() {
        if (this.life <= 0) return;
        
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.speedX * this.length * 0.1, this.y + this.speedY * this.length * 0.1); // Add angle to trail
        
        // Set the gradient for the streak/trail
        const gradient = ctx.createLinearGradient(
          this.x, this.y,
          this.x + this.speedX * this.length * 0.1, this.y + this.speedY * this.length * 0.1
        );
        gradient.addColorStop(0, `rgba(255, 251, 224, ${this.alpha})`); // Bright head
        gradient.addColorStop(1, `rgba(255, 251, 224, 0)`); // Fading trail tail

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      update() {
        if (this.life <= 0) return;

        this.y += this.speedY;
        this.x += this.speedX;
        this.alpha -= this.tailAlphaDecay; // Trail fades over time
        this.life--;

        this.draw();
      }
    }

    // Initialize particles
    for (let i = 0; i < 75; i++) { // Fewer hearts
      heartParticles.push(new HeartParticle());
    }

    // Initialize few shooting stars to start
    for (let i = 0; i < 3; i++) {
        starParticles.push(new StarParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartParticles.forEach(p => p.update());
      
      // Update/Draw stars, filtering out the "dead" ones
      starParticles = starParticles.filter(p => p.life > 0);
      starParticles.forEach(p => p.update());

      // Randomly spawn new shooting stars
      if (Math.random() < 0.015 && starParticles.length < 8) { // Adjust frequency
        starParticles.push(new StarParticle());
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

export default PreludeBackground;