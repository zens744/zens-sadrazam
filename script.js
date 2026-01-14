// 1. Matrix Arka Plan Efekti
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0084ff"; // Neon Mavi
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 2. Canlı Log Beslemesi
const logFeed = document.getElementById('log-feed');
const logMessages = [
    "Connection established to secure_proxy_v4",
    "Encrypted data packet received (1024kb)",
    "Bypassing secondary firewall...",
    "User 'zZens' authorized via terminal",
    "Sadrazam: New tool 'InstaSpy' initialized",
    "Security scan: 0 vulnerabilities found",
    "Monitoring active sessions: 12",
    "Database backup completed on Node-7",
    "Incoming request from unknown IP: 192.168.1.1",
    "Access denied on system_core_files",
    "New blog entry published: Bot Mastery 101"
];

function addLog() {
    const time = new Date().toLocaleTimeString();
    const message = logMessages[Math.floor(Math.random() * logMessages.length)];
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<span>[${time}]</span> > ${message}`;
    logFeed.prepend(logEntry);

    if (logFeed.childNodes.length > 20) {
        logFeed.removeChild(logFeed.lastChild);
    }
}
setInterval(addLog, 2000);

// 6. Özel İmleç (Custom Cursor) Takibi
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

const interactiveElements = document.querySelectorAll('a, button, .card-3d, .blog-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// 3. YouTube Müzik Oynatıcısı
let player;
const playBtn = document.getElementById('play-btn');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'HWjCStB6k4o',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'HWjCStB6k4o'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    playBtn.addEventListener('click', () => {
        if (player.getPlayerState() === 1) {
            player.pauseVideo();
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i> AUDIO';
        } else {
            player.playVideo();
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> PLAYING';
        }
    });
}

// YouTube API'yi yükle
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 4. Easter Egg: 1337
let keys = [];
window.addEventListener('keydown', (e) => {
    keys.push(e.key);
    if (keys.length > 4) keys.shift();
    if (keys.join('') === '1337') {
        alert('ACCESS GRANTED: Gizli Arşive Hoş Geldin, ajan.');
        document.body.style.filter = 'hue-rotate(90deg)';
        keys = [];
    }
});

// 5. Scroll ve Navigasyon
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
        nav.style.padding = '1rem 0';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
        nav.style.padding = '1.5rem 0';
    }
});
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSystemSound(freq, type, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// 8. Preloader Mantığı
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.progress-bar');
    const statusText = document.querySelector('.status-text');
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                playSystemSound(800, 'square', 0.1); // Giriş sesi
            }, 500);
        } else {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            progressBar.style.width = width + '%';

            if (width > 30) statusText.innerText = "BYPASSING_FIREWALLS...";
            if (width > 60) statusText.innerText = "INJECTING_SCRIPTS...";
            if (width > 90) statusText.innerText = "ACCESS_GRANTED_WELCOME_AGENT";
        }
    }, 200);
});

// 9. Canlı Dashboard Verileri
function updateDashboard() {
    const cpu = document.getElementById('cpu-load');
    const net = document.getElementById('net-traffic');
    const btc = document.getElementById('btc-price');

    cpu.innerText = Math.floor(Math.random() * 40 + 5) + "%";
    net.innerText = (Math.random() * 5 + 0.5).toFixed(1) + " MB/s";

    // Basit BTC fiyat oynatıcı
    let currentBtc = 98432 + (Math.random() * 100 - 50);
    btc.innerText = "$" + Math.floor(currentBtc).toLocaleString();
}
setInterval(updateDashboard, 2000);

// Hover sesleri ekle
const soundElements = document.querySelectorAll('a, button, .card-3d, .blog-card, .project-box');
soundElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        playSystemSound(1200, 'sine', 0.05);
    });
});
