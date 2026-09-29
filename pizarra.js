const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

// Configuración inicial del fondo de la pizarra
function fillWhiteBackground() {
    ctx.fillStyle = '#fff9fc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
fillWhiteBackground();

let painting = false;
let currentColor = '#1a1a1a';
let currentWidth = 3;

// Iniciar el trazo (funciona para mouse y touch)
function startPosition(e) {
    painting = true;
    draw(e);
}

// Finalizar el trazo
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// Lógica principal de dibujo
function draw(e) {
    if (!painting) return;
    
    // Evita el scroll y movimientos raros de pantalla en celulares al pintar
    if (e.cancelable) {
        e.preventDefault();
    }

    const rect = canvas.getBoundingClientRect();
    
    // Detectar si es evento de mouse o toque táctil en móviles
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    // Calcular las coordenadas exactas dentro del lienzo
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Estilos del pincel
    ctx.lineWidth = currentWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentColor;

    // Pintar la línea
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// --- ESCUCHADORES DE EVENTOS ---

// Eventos de Mouse (Computadora)
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Eventos Touch (Móviles / Tablets)
canvas.addEventListener('touchstart', startPosition, { passive: false });
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw, { passive: false });

// Lógica de los botones de la paleta de colores
const colorBtns = document.querySelectorAll('.color-btn');
colorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        colorBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentColor = e.target.getAttribute('data-color');
        currentWidth = 3; // Regresa al tamaño de lápiz normal
    });
});

// Botón de la Goma de Borrar
const eraserBtn = document.getElementById('eraserBtn');
if (eraserBtn) {
    eraserBtn.addEventListener('click', () => {
        currentColor = '#fff9fc'; // Pinta con el color del fondo
        currentWidth = 15;        // Trazo más grueso para borrar mejor
    });
}

// Botón de Limpiar Lienzo por completo
const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        fillWhiteBackground();
    });
}

// Botón para Guardar Dibujo e ir al Ask
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'mi-dibujo-vaelwynne.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Abre tu ask en una pestaña nueva para que te adjunten la foto
        window.open('https://tumblr.com', '_blank');
    });
}
