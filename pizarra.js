const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

function fillWhiteBackground() {
    ctx.fillStyle = '#fff9fc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
fillWhiteBackground();

let painting = false;
let currentColor = '#1a1a1a';
let currentWidth = 3;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineWidth = currentWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

const colorBtns = document.querySelectorAll('.color-btn');
colorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        colorBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentColor = e.target.getAttribute('data-color');
        currentWidth = 3;
    });
});

const eraserBtn = document.getElementById('eraserBtn');
if (eraserBtn) {
    eraserBtn.addEventListener('click', () => {
        currentColor = '#fff9fc';
        currentWidth = 12;
    });
}

const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        fillWhiteBackground();
    });
}

const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'mi-dibujo-vaelwynne.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        window.open('https://mindysuhq.tumblr.com/ask', '_blank');
    });
}
