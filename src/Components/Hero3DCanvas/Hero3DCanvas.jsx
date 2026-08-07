import { useEffect, useRef } from 'react';

function Hero3DCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle sphere data
    const particles = [];
    const numParticles = Math.min(Math.floor(width / 15), 90);
    const globeRadius = Math.min(width, height) * 0.28;

    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particles.push({
        x: globeRadius * Math.sin(phi) * Math.cos(theta),
        y: globeRadius * Math.sin(phi) * Math.sin(theta),
        z: globeRadius * Math.cos(phi),
        baseX: globeRadius * Math.sin(phi) * Math.cos(theta),
        baseY: globeRadius * Math.sin(phi) * Math.sin(theta),
        baseZ: globeRadius * Math.cos(phi),
        size: Math.random() * 2 + 1,
        color: i % 3 === 0 ? '#38BDF8' : i % 2 === 0 ? '#0EA5E9' : '#2563EB'
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.75;
      const centerY = height * 0.45;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Rotate and project particles
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y1;
        p.z = z2;

        // Perspective scale factor
        const scale = 400 / (400 + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y1 * scale;

        projected.push({ x: projX, y: projY, scale, z: z2, color: p.color });
      }

      // Draw particle connection lines
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 110) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.2, (p.z + globeRadius) / (globeRadius * 2));

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#0EA5E9';
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none z-0"
      style={{ opacity: 0.65 }}
      aria-hidden="true"
    />
  );
}

export default Hero3DCanvas;
