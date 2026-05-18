import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ isDarkTheme }) => {
  const canvasRef = useRef(null);
  
  // We use a ref for the theme so the animation loop can read it without restarting
  const themeRef = useRef(isDarkTheme);

  useEffect(() => {
    themeRef.current = isDarkTheme;
  }, [isDarkTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // The two color palettes
    const pinkColors = [
      '#ebe5d0ff', // Misty rose / soft cream
      '#6a0551ff', // Light pastel pink
      '#dfda92ff', // Slightly deeper pink
      '#b11883ff', // Pure white for a glowing contrast
    ];
    const cyanColors = [
      '#00fefeff', // Bright cyan
      '#5dacf1ff', // Soft cyan
      '#64dccaff', // Vivid cyan
      '#9752d7ff', // Light lavender
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class HeartParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Distribute evenly on start
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.z = Math.random(); 
        
        this.size = (this.z * 15) + 5; 
        this.speedY = (this.z * 1) + 0.2; 
        this.alpha = (this.z * 0.5) + 0.3; 
        this.baseX = this.x;
        this.phase = Math.random() * Math.PI * 2;

        // Pick initial color based on the current theme
        const colors = themeRef.current ? cyanColors : pinkColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.currentTheme = themeRef.current;
      }

      draw() {
        // INSTANT THEME SWAP: If the theme changed while the heart is floating, change its color instantly
        if (this.currentTheme !== themeRef.current) {
            const colors = themeRef.current ? cyanColors : pinkColors;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.currentTheme = themeRef.current;
        }

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
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
        this.x = this.baseX + Math.sin(this.phase) * (this.z * 10); 
        this.phase += 0.005;

        if (this.y < -50) {
          this.reset();
        }
        this.draw();
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new HeartParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
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

export default ParticleBackground;






/* [
      '#ebe5d0ff', // Misty rose / soft cream
      '#6a0551ff', // Light pastel pink
      '#dfda92ff', // Slightly deeper pink
      '#b11883ff', // Pure white for a glowing contrast
    ];*/