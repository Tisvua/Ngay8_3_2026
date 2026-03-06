/* ============================================
   🎵 MUSIC PAGE — JavaScript
   ============================================ */

// ====== CẤU HÌNH PLAYLIST ======
// 👉 Thêm bài hát vào đây. Đặt file MP3 trong thư mục assets/music/
const playlist = [
    {
        title: "Bài hát mẫu 1",
        artist: "Ca sĩ A",
        src: "assets/music/song1.mp3",
        message: "💕 Bài hát đầu tiên anh muốn dành cho em..."
    },
    {
        title: "Bài hát mẫu 2",
        artist: "Ca sĩ B",
        src: "assets/music/song2.mp3",
        message: "🌸 Bài này nhắc anh về lần đầu gặp em"
    },
    {
        title: "Bài hát mẫu 3",
        artist: "Ca sĩ C",
        src: "assets/music/song3.mp3",
        message: "💖 Mỗi khi nghe bài này, anh lại nghĩ đến em"
    }
];
// ================================

// --- Auth Check ---
if (sessionStorage.getItem('unlocked') !== 'true') {
    window.location.href = 'index.html';
}

// --- Loading Screen ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loadingScreen');
        if (loading) loading.classList.add('hidden');
    }, 800);
});

// --- Floating Hearts ---
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    if (!container) return;
    const hearts = ['💕', '💖', '🌸', '🩷', '♪', '♫', '🎵'];
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 12 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 7) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.opacity = Math.random() * 0.2 + 0.1;
        container.appendChild(heart);
    }
}
createFloatingHearts();

// --- Music Player ---
const audio = document.getElementById('audioPlayer');
const vinylDisc = document.getElementById('vinylDisc');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songMessage = document.getElementById('songMessage');
const playBtn = document.getElementById('playBtn');
const progressFill = document.getElementById('progressFill');
const progressWrapper = document.getElementById('progressWrapper');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const playlistEl = document.getElementById('playlist');

let currentIndex = 0;
let isPlaying = false;

// --- Render Playlist ---
function renderPlaylist() {
    if (playlist.length === 0) {
        playlistEl.innerHTML = `
            <div class="empty-playlist">
                <div class="empty-icon">🎵</div>
                <p>Chưa có bài hát nào!<br>
                Thêm file MP3 vào thư mục <strong>assets/music/</strong><br>
                và cập nhật playlist trong <strong>js/music.js</strong></p>
            </div>
        `;
        return;
    }

    playlistEl.innerHTML = playlist.map((song, i) => `
        <div class="playlist-item ${i === currentIndex ? 'active' : ''}" onclick="playSong(${i})">
            <div class="item-number">${i + 1}</div>
            <div class="item-info">
                <div class="item-title">${song.title}</div>
                <div class="item-artist">${song.artist}</div>
            </div>
            <div class="item-playing">🎵</div>
        </div>
    `).join('');
}

// --- Load Song ---
function loadSong(index) {
    if (playlist.length === 0) return;

    currentIndex = index;
    const song = playlist[currentIndex];

    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songMessage.textContent = song.message;

    renderPlaylist();
}

// --- Play Song ---
function playSong(index) {
    loadSong(index);
    audio.play().catch(e => console.log('Audio play error:', e));
    isPlaying = true;
    playBtn.textContent = '⏸️';
    vinylDisc.classList.add('spinning');
}

// --- Toggle Play/Pause ---
function togglePlay() {
    if (playlist.length === 0) return;

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶️';
        vinylDisc.classList.remove('spinning');
    } else {
        if (!audio.src || audio.src === window.location.href) {
            loadSong(0);
        }
        audio.play().catch(e => console.log('Audio play error:', e));
        isPlaying = true;
        playBtn.textContent = '⏸️';
        vinylDisc.classList.add('spinning');
    }
}

// --- Next / Prev ---
function nextSong() {
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(nextIndex);
}

function prevSong() {
    if (playlist.length === 0) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(prevIndex);
}

// --- Progress Bar ---
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    }
});

audio.addEventListener('ended', () => {
    nextSong();
});

// --- Click on progress bar ---
progressWrapper.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressWrapper.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audio.currentTime = percent * audio.duration;
});

// --- Format Time ---
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// --- Music Notes Effect ---
function spawnMusicNote() {
    if (!isPlaying) return;

    const container = document.getElementById('musicNotesContainer');
    if (!container) return;

    const notes = ['♪', '♫', '🎵', '🎶', '💖'];
    const note = document.createElement('span');
    note.classList.add('music-note-float');
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = (Math.random() * 80 + 10) + '%';
    note.style.bottom = '100px';
    note.style.fontSize = (Math.random() * 15 + 15) + 'px';
    container.appendChild(note);

    setTimeout(() => note.remove(), 2000);
}

setInterval(spawnMusicNote, 800);

// --- Initialize ---
renderPlaylist();
if (playlist.length > 0) {
    loadSong(0);
}
