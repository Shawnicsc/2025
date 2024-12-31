// 更新时钟
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // 检查是否到达2025年1月1日
    const newYear = new Date('2025-01-01T00:00:00');
    if (now >= newYear && !window.fireworksStarted) {
        window.fireworksStarted = true;
        startCelebration();
    }
}

// 开始庆祝
function startCelebration() {
    const messages = document.querySelector('.messages');
    messages.style.display = 'block';
    
    // 显示消息
    document.querySelectorAll('.message').forEach((msg, index) => {
        setTimeout(() => {
            msg.style.transition = 'all 1s ease-out';
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
        }, index * 1000);
    });

    // 初始化烟花
    initFireworks();
}

// 烟花效果
function initFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }

        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.01;
        }
    }

    let particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const colors = [
            '255, 0, 0',
            '0, 255, 0',
            '0, 0, 255',
            '255, 255, 0',
            '255, 0, 255'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter(particle => particle.alpha > 0);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        if (Math.random() < 0.05) {
            createFirework();
        }
    }

    animate();
}

// 启动时钟
setInterval(updateClock, 1000);
updateClock();

// 窗口大小改变时调整画布大小
window.addEventListener('resize', () => {
    const canvas = document.getElementById('fireworks');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}); 