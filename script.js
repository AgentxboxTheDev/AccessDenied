window.onload = () => {
  const bootScreen = document.getElementById('bootScreen');

  // Hide everything else
  document.querySelectorAll('canvas, #aboutBtn, #scanButton, #colorButton, #bonusButton, .ui, #taskbar')
    .forEach(el => el.style.display = 'none');

  // Wait 10 seconds then show everything
  setTimeout(() => {
    bootScreen.style.display = 'none';

    // Reveal the rest of the UI
    document.querySelectorAll('canvas, #aboutBtn, #scanButton, #colorButton, #bonusButton, .ui, #taskbar')
      .forEach(el => el.style.display = '');

    // Start Matrix Rain
    draw(); // call your draw loop to activate rain
  }, 10000);
};

// Get DOM elements
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const messageBox = document.getElementById('messageBox');
const colorButton = document.getElementById('colorButton');
const scanButton = document.getElementById('scanButton');
const scanBox = document.getElementById('scanBox');
const heartMonitor = document.getElementById('heartMonitor');
const easterEggBox = document.getElementById('easterEggBox');
const bonusButton = document.getElementById('bonusButton');
const bonusBox = document.getElementById('bonusBox');
const summonEntityDiv = document.getElementById('summonEntity');
const hackTerminal = document.getElementById('hackTerminal');
const fakeClock = document.getElementById('fakeClock');

// Setup canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = new Array(columns).fill(1);

const greenShades = ['#00FF00', '#66FF66', '#33CC33', '#009900', '#00CC44'];
let colorIndex = 0;
let useRainbowFont = false;

const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white', 'brown', 'black'];

// Draw matrix rain
function draw() {
  ctx.fillStyle = 'rgba(0, 17, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = letters.charAt(Math.floor(Math.random() * letters.length));
    if (useRainbowFont) {
      ctx.fillStyle = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    } else {
      ctx.fillStyle = greenShades[colorIndex];
    }
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(draw);
}

// Color change button event
colorButton.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % greenShades.length;
  messageBox.textContent = `Color changed to shade ${colorIndex + 1}`;
  setTimeout(() => (messageBox.textContent = ''), 2000);
});

// Virus Scan simulation
scanButton.addEventListener('click', () => {
  scanButton.disabled = true;
  scanBox.style.display = 'block';
  scanBox.textContent = '';
  heartMonitor.style.display = 'none';

  const scanSteps = [
    "Initializing virus scan...",
    "Scanning system files...",
    "Scanning registry...",
    "Checking network connections...",
    "Detecting malware signatures...",
    "Analyzing physical vitals...",
    "Heart rate stable...",
    "Resuming malware detection...",
    "System compromised! 💀"
  ];

  let i = 0;
  const scanInterval = setInterval(() => {
    scanBox.textContent += scanSteps[i] + '\n';
    scanBox.scrollTop = scanBox.scrollHeight;

    if (i === 5) heartMonitor.style.display = 'block';
    if (i === 7) heartMonitor.style.display = 'none';

    i++;
    if (i >= scanSteps.length) {
      clearInterval(scanInterval);
      triggerRainbowEasterEgg();
      scanButton.disabled = false;
    }
  }, 1200);
});

// Easter egg functions
function triggerRainbowEasterEgg() {
  setTimeout(() => {
    easterEggBox.style.display = 'block';
  }, 20000);
}
window.revealMagicFont = function() {
  easterEggBox.querySelector('p').textContent = 'Then click...';
}
window.activateRainbow = function() {
  useRainbowFont = true;
  easterEggBox.style.display = 'none';
}

// Bonus button toggle
bonusButton.addEventListener('click', () => {
  bonusBox.style.display = bonusBox.style.display === 'block' ? 'none' : 'block';
});

// Summon entity function
window.summonEntity = function() {
  summonEntityDiv.style.display = 'block';
  setTimeout(() => {
    summonEntityDiv.style.display = 'none';
  }, 3000);
}

// Toggle hack terminal
window.toggleTerminal = function() {
  hackTerminal.style.display = hackTerminal.style.display === 'block' ? 'none' : 'block';
}

// Fake clock update
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2,'0');
  const minutes = now.getMinutes().toString().padStart(2,'0');
  fakeClock.textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// Start animation
draw();

// Optional: resize handler (to adjust canvas on window resize)
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});