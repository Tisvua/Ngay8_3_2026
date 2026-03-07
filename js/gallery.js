/* ============================================
   📸 GALLERY — Falling Photos like Flowers
   Catch photos to view them!
   ============================================ */

var SPECIAL_INDEX = 26; // photo 16
var TOTAL = 27;
var photos = [];
for (var i = 1; i <= TOTAL; i++) {
    photos.push({ src: 'assets/images/' + i + '.jpg', index: i });
}

// Track state
var lightboxIndex = 0;

// --- Auth ---
if (sessionStorage.getItem('unlocked') !== 'true') {
    window.location.href = 'index.html';
}

// --- Loading ---
window.addEventListener('load', function () {
    setTimeout(function () {
        var ld = document.getElementById('loadingScreen');
        if (ld) ld.classList.add('hidden');
        setTimeout(startRain, 400);
    }, 800);
});

// --- Floating Hearts BG ---
(function () {
    var c = document.getElementById('heartsBg');
    if (!c) return;
    var h = ['💕', '💖', '🌸', '🩷', '✨'];
    for (var i = 0; i < 6; i++) {
        var s = document.createElement('span');
        s.classList.add('heart');
        s.textContent = h[Math.floor(Math.random() * h.length)];
        s.style.left = Math.random() * 100 + '%';
        s.style.fontSize = (Math.random() * 8 + 10) + 'px';
        s.style.animationDuration = (Math.random() * 8 + 7) + 's';
        s.style.animationDelay = (Math.random() * 10) + 's';
        s.style.opacity = Math.random() * 0.08 + 0.03;
        c.appendChild(s);
    }
})();

// === MAIN: Rain of photos + flowers ===
var fallZone = document.getElementById('fallZone');

// --- Bottom decorative gifs (alternating 12 & 13, scrolling) ---
(function () {
    var deco = document.getElementById('bottomDeco');
    if (!deco) return;
    var screenW = window.innerWidth;
    var imgW = screenW <= 500 ? 140 : 200;
    var count = Math.ceil(screenW / imgW) + 1;
    // Double for seamless loop
    for (var i = 0; i < count * 2; i++) {
        var img = document.createElement('img');
        img.src = i % 2 === 0 ? 'assets/gif/Cute/12.webp' : 'assets/gif/Cute/13.webp';
        img.alt = '';
        deco.appendChild(img);
    }
})();

var flowerEmojis = ['🌸', '🌷', '🌺', '💐', '🌹', '🏵️', '💮', '🌻'];
var photoQueue = [];
var rainInterval;
var flowerInterval;

function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
}

function refillQueue() {
    photoQueue = shuffleArray(photos);
}

function startRain() {
    refillQueue();

    // Drop first batch quickly
    for (var i = 0; i < 4; i++) {
        (function (delay) {
            setTimeout(function () { dropPhoto(); }, delay);
        })(i * 600);
    }

    // Then continuous drops
    rainInterval = setInterval(function () {
        dropPhoto();
    }, 1800);

    // Flowers continuously
    flowerInterval = setInterval(function () {
        dropFlower();
    }, 500);

    // Initial flower burst
    for (var j = 0; j < 10; j++) {
        (function (delay) {
            setTimeout(function () { dropFlower(); }, delay);
        })(j * 150);
    }
}

function dropPhoto() {
    if (photoQueue.length === 0) refillQueue();
    var photo = photoQueue.pop();
    var idx = photo.index - 1;
    var isSpecial = idx === SPECIAL_INDEX;

    var screenW = window.innerWidth;
    var pw = Math.min(Math.max(screenW * 0.3, 90), 150);
    var maxLeft = screenW - pw - 10;
    var px = Math.floor(Math.random() * maxLeft) + 5;
    var rot = (Math.random() * 30 - 15).toFixed(1);
    var dur = (Math.random() * 3 + 5).toFixed(1);
    var sway = (Math.random() * 50 - 25).toFixed(0);

    var el = document.createElement('div');
    el.className = 'falling-photo' + (isSpecial ? ' special' : '');
    el.dataset.index = String(idx);
    el.style.setProperty('--pw', pw + 'px');
    el.style.left = px + 'px';
    el.style.setProperty('--prot', rot + 'deg');
    el.style.setProperty('--pdur', dur + 's');
    el.style.setProperty('--psway', sway + 'px');
    el.style.setProperty('--pdelay', '0s');

    el.innerHTML =
        '<div class="polaroid">' +
            '<img src="' + photo.src + '" alt="">' +
        '</div>' +
        (isSpecial ? '<span class="badge">💖</span>' : '');

    el.addEventListener('click', function (e) {
        e.stopPropagation();
        catchPhoto(el, idx);
    });

    el.addEventListener('animationend', function () {
        if (el.parentNode) el.parentNode.removeChild(el);
    });

    fallZone.appendChild(el);
}

function catchPhoto(el, idx) {
    el.classList.add('caught');
    setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 500);

    openLightbox(idx);
}


function dropFlower() {
    var emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    var el = document.createElement('span');
    el.className = 'flower';
    el.textContent = emoji;
    el.style.left = (Math.random() * 100) + '%';
    el.style.setProperty('--fsize', (Math.random() * 12 + 14) + 'px');
    el.style.setProperty('--fdur', (Math.random() * 3 + 4) + 's');
    el.style.setProperty('--fdelay', '0s');
    el.style.setProperty('--fsway', (Math.random() * 50 - 25) + 'px');
    fallZone.appendChild(el);
    el.addEventListener('animationend', function () {
        if (el.parentNode) el.parentNode.removeChild(el);
    });
}

// === CUTE GIF STICKERS ===
var cuteGifs = [];
for (var g = 1; g <= 10; g++) {
    cuteGifs.push('assets/gif/Cute/' + g + '.webp');
}
var stickerPositions = ['pos-bottom-right', 'pos-bottom-left', 'pos-bottom-center'];

function clearStickers() {
    var old = document.querySelectorAll('.lightbox-sticker');
    for (var i = 0; i < old.length; i++) {
        old[i].parentNode.removeChild(old[i]);
    }
}

function addStickers() {
    var lb = document.getElementById('lightbox');
    // 1 or 2 stickers
    var count = Math.random() < 0.5 ? 1 : 2;
    var usedPositions = shuffleArray(stickerPositions).slice(0, count);
    var usedGifs = shuffleArray(cuteGifs).slice(0, count);

    for (var i = 0; i < count; i++) {
        var sticker = document.createElement('div');
        sticker.className = 'lightbox-sticker ' + usedPositions[i];
        var stickerImg = document.createElement('img');
        stickerImg.src = usedGifs[i];
        stickerImg.alt = '';
        sticker.appendChild(stickerImg);
        lb.appendChild(sticker);
    }
}

// === LIGHTBOX ===
var wishGifs = [
    'assets/gif/Cute/6.webp',
    'assets/gif/Cute/9.webp',
    'assets/gif/Cute/5.webp',
    'assets/gif/Cute/10.webp',
    'assets/gif/Cute/1.webp'
];
var wishes = [
    'Chúc em luôn xinh đẹp 💕',
    'Mãi yêu thương em 😘',
    'Hạnh phúc mỗi ngày nha 😻',
    'Em là điều tuyệt vời nhất ✨',
    'Cười thật nhiều nha 🥰',
    'Ngày 8/3 vui vẻ! 🥰',
    'Luôn rạng rỡ như hoa 🌺',
    'Thương em nhiều lắm 💗',
    'Mãi là cô gái đáng yêu cảu anh 😘',
    'yêu em 🎀'
];
var wishInterval = null;

function clearWishes() {
    if (wishInterval) { clearInterval(wishInterval); wishInterval = null; }
    var old = document.querySelectorAll('.falling-wish');
    for (var i = 0; i < old.length; i++) {
        old[i].parentNode.removeChild(old[i]);
    }
}

function dropWish() {
    var gif = wishGifs[Math.floor(Math.random() * wishGifs.length)];
    var text = wishes[Math.floor(Math.random() * wishes.length)];
    var el = document.createElement('div');
    el.className = 'falling-wish';
    el.style.left = (Math.random() * 50 + 15) + '%';
    el.style.setProperty('--wdur', (Math.random() * 3 + 6) + 's');
    el.style.setProperty('--wdelay', '0s');
    el.style.setProperty('--wsway', (Math.random() * 40 - 20) + 'px');
    var img = document.createElement('img');
    img.src = gif;
    img.alt = '';
    var span = document.createElement('span');
    span.textContent = text;
    el.appendChild(img);
    el.appendChild(span);
    document.body.appendChild(el);
    el.addEventListener('animationend', function () {
        if (el.parentNode) el.parentNode.removeChild(el);
    });
}

function startWishes() {
    // Initial burst
    for (var i = 0; i < 2; i++) {
        (function (d) { setTimeout(dropWish, d); })(i * 800);
    }
    // Continuous
    wishInterval = setInterval(dropWish, 2500);
}

function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    clearStickers();
    addStickers();
    clearWishes();
    startWishes();
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    clearStickers();
    clearWishes();
}


function updateLightbox() {
    var p = photos[lightboxIndex];
    var img = document.getElementById('lightboxImg');
    img.src = p.src;
    img.alt = '';
    var badge = document.getElementById('lightboxBadge');
    if (badge) badge.classList.toggle('show', lightboxIndex === SPECIAL_INDEX);
}

// Keyboard — only Escape to close
document.addEventListener('keydown', function (e) {
    var lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
});

// Tap lightbox background to close
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});
