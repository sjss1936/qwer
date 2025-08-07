const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function init() {
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < 100; i++) {
        const x = Math.sin(time + i * 0.1) * width * 0.4 + width / 2;
        const y = Math.cos(time + i * 0.1) * height * 0.4 + height / 2;
        const dist = Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2));
        
        ctx.beginPath();
        ctx.arc(x, y, dist / 50, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 82, 255, ${1 - dist / (width / 2)})`;
        ctx.fill();
    }
    
    requestAnimationFrame(animate);
}

init();
