/* ============================================
   🔐 LOCK PAGE v2 — PIN Numpad
   ============================================ */

// ====== CẤU HÌNH MẬT KHẨU (4 số) ======
// 👉 Thay đổi mật khẩu tại đây
const SECRET_PASSWORD = "0803";
const PIN_LENGTH = 4;
// ========================================

let currentPin = '';
let isLocked = false; // prevent input during animations

// --- Loading Screen ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loadingScreen');
        if (loading) loading.classList.add('hidden');
    }, 1500);
});

// --- Floating Hearts Background ---
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    if (!container) return;
    const hearts = ['💕', '💖', '💗', '💓', '💝', '🌸', '🩷', '♥'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(heart);
    }
}
createFloatingHearts();

// --- DOM References ---
const dots = document.querySelectorAll('.pin-dot');
const errorMsg = document.getElementById('errorMsg');

// --- Update Dots Display ---
function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.remove('filled', 'error', 'success');
        if (i < currentPin.length) {
            dot.classList.add('filled');
        }
    });
}

// --- Add Digit ---
function addDigit(num) {
    if (isLocked || currentPin.length >= PIN_LENGTH) return;

    currentPin += num;
    updateDots();

    // Auto-check when 4 digits entered
    if (currentPin.length === PIN_LENGTH) {
        isLocked = true;
        setTimeout(() => checkPin(), 300);
    }
}

// --- Delete Last Digit ---
function deleteDigit() {
    if (isLocked || currentPin.length === 0) return;
    currentPin = currentPin.slice(0, -1);
    updateDots();
    errorMsg.classList.remove('show');
}

// --- Clear All ---
function clearAll() {
    if (isLocked) return;
    currentPin = '';
    updateDots();
    errorMsg.classList.remove('show');
}

// --- Check PIN ---
function checkPin() {
    if (currentPin === SECRET_PASSWORD) {
        // ✅ SUCCESS
        dots.forEach((dot, i) => {
            setTimeout(() => dot.classList.add('success'), i * 100);
        });

        errorMsg.classList.remove('show');
        sessionStorage.setItem('unlocked', 'true');

        setTimeout(() => showHeartBurst(), 400);

        setTimeout(() => {
            document.getElementById('successOverlay').classList.add('show');
        }, 800);

        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 2800);
    } else {
        // ❌ WRONG
        dots.forEach((dot, i) => {
            setTimeout(() => dot.classList.add('error'), i * 50);
        });

        errorMsg.classList.add('show');

        // Shake the keypad card
        const card = document.querySelector('.keypad-card');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'shake 0.5s ease';

        setTimeout(() => {
            currentPin = '';
            updateDots();
            isLocked = false;
            card.style.animation = '';
        }, 800);

        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 3000);
    }
}

// --- Numpad Click Handlers ---
document.getElementById('numpad').addEventListener('click', (e) => {
    const btn = e.target.closest('.numpad-btn');
    if (!btn) return;

    if (btn.dataset.num !== undefined) {
        addDigit(btn.dataset.num);
    } else if (btn.dataset.action === 'delete') {
        deleteDigit();
    } else if (btn.dataset.action === 'clear') {
        clearAll();
    }
});

// --- Keyboard support (for desktop) ---
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        addDigit(e.key);
    } else if (e.key === 'Backspace') {
        deleteDigit();
    } else if (e.key === 'Escape') {
        clearAll();
    }
});

// --- Heart Burst Effect ---
function showHeartBurst() {
    const container = document.getElementById('heartBurst');
    container.classList.add('active');

    const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️', '🩷', '🌸'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('span');
        heart.classList.add('burst-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';

        const angle = (Math.PI * 2 * i) / 40;
        const distance = Math.random() * 300 + 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        heart.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(1.2)`, opacity: 0.8, offset: 0.4 },
            { transform: `translate(${tx * 1.5}px, ${ty * 1.5}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out',
            fill: 'forwards',
            delay: Math.random() * 300
        });

        container.appendChild(heart);
    }
}
