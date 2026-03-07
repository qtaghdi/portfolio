export function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = [];
    for (let i = 0; i < 250; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.1 + 0.2,
            opacity: Math.random() * 0.6 + 0.1,
            dir: Math.random() > 0.5 ? 1 : -1,
            speed: Math.random() * 0.007 + 0.002,
        });
    }
    for (let i = 0; i < 20; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 1.0,
            opacity: Math.random() * 0.5 + 0.3,
            dir: Math.random() > 0.5 ? 1 : -1,
            speed: Math.random() * 0.004 + 0.001,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.opacity += s.speed * s.dir;
            if (s.opacity >= 0.9) s.dir = -1;
            if (s.opacity <= 0.05) s.dir = 1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}
