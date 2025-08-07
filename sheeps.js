const sheepsCanvas = document.getElementById('sheeps-canvas');
const sheepsCtx = sheepsCanvas.getContext('2d');

let sheepsWidth, sheepsHeight;
let sheepsMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

class Sheep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 2 + 1;
    }

    draw() {
        sheepsCtx.fillStyle = 'white';
        sheepsCtx.strokeStyle = 'black';
        sheepsCtx.lineWidth = 2;

        // Draw body
        sheepsCtx.beginPath();
        sheepsCtx.ellipse(this.x, this.y, 30, 20, 0, 0, Math.PI * 2);
        sheepsCtx.fill();
        sheepsCtx.stroke();

        // Draw head
        sheepsCtx.beginPath();
        sheepsCtx.arc(this.x + 30, this.y - 10, 15, 0, Math.PI * 2);
        sheepsCtx.fill();
        sheepsCtx.stroke();

        // Draw legs
        sheepsCtx.beginPath();
        sheepsCtx.moveTo(this.x - 15, this.y + 20);
        sheepsCtx.lineTo(this.x - 15, this.y + 40);
        sheepsCtx.moveTo(this.x + 15, this.y + 20);
        sheepsCtx.lineTo(this.x + 15, this.y + 40);
        sheepsCtx.stroke();
    }

    update() {
        const dx = sheepsMouse.x - this.x;
        const dy = sheepsMouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }
}

const flock = [];

function sheepsInit() {
    sheepsResize();
    window.addEventListener('resize', sheepsResize);
    sheepsCanvas.addEventListener('mousemove', (e) => {
        const rect = sheepsCanvas.getBoundingClientRect();
        sheepsMouse.x = e.clientX - rect.left;
        sheepsMouse.y = e.clientY - rect.top;
    });

    for (let i = 0; i < 10; i++) {
        flock.push(new Sheep(Math.random() * sheepsWidth, Math.random() * sheepsHeight));
    }

    sheepsAnimate();
}

function sheepsResize() {
    sheepsWidth = sheepsCanvas.width = sheepsCanvas.clientWidth;
    sheepsHeight = sheepsCanvas.height = sheepsCanvas.clientHeight;
}

function sheepsAnimate() {
    sheepsCtx.clearRect(0, 0, sheepsWidth, sheepsHeight);
    flock.forEach(sheep => {
        sheep.update();
        sheep.draw();
    });
    requestAnimationFrame(sheepsAnimate);
}

sheepsInit();
