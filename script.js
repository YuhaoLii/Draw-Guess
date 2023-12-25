const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
ctx.strokeStyle = '#000';
ctx.lineWidth = 5;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

document.querySelectorAll('.colorButton').forEach(button => {
    button.addEventListener('click', function() {
        ctx.strokeStyle = this.getAttribute('data-color');
    });
});

document.getElementById('penSize').addEventListener('input', function() {
    ctx.lineWidth = this.value;
});

// Room Creation and Joining
document.getElementById('createRoom').addEventListener('click', () => {
    showNameInput();
});

document.getElementById('joinRoom').addEventListener('click', () => {
    const roomId = document.getElementById('roomIdInput').value.trim();
    if (roomId) {
        showNameInput();
    } else {
        alert('Please enter a room ID.');
    }
});

function showNameInput() {
    document.getElementById('roomControls').style.display = 'none';
    document.getElementById('nameInputPage').style.display = 'block';
}

// Name Input and Game Entry
document.getElementById('enterGame').addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName) {
        document.getElementById('nameInputPage').style.display = 'none';
        document.getElementById('gameRoom').style.display = 'block';
        initializeGame(playerName);
    } else {
        alert('Please enter your name.');
    }
});

function initializeGame(playerName) {
    // Player seating logic
    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', function() {
            const profile = this.querySelector('.playerProfile');
            if (!profile.style.display || profile.style.display === 'none') {
                profile.style.display = 'block';
                profile.textContent = playerName;
            } else {
                profile.style.display = 'none';
            }
        });
    });
    // Additional game setup
}
// The rest of your game logic
