/* ============================================
   💌 LETTER PAGE — JavaScript
   ============================================ */

// ====== CẤU HÌNH LÁ THƯ ======

const LETTER_GREETING = "Gửi người anh yêu thương nhất,";

const LETTER_CONTENT = `Nhân ngày 8/3 này, anh muốn nói với em rằng — có em trong có lẽ là điều mắn nhất anh từng có cho đến nay.

anh cũng không biết phải nói gì nhiều, chỉ muốn em biết rằng anh yêu em rất nhiều, và anh sẽ luôn ở đây để yêu thương và quan tâm em.

Chúc em ngày 8/3 thật vui, luôn xinh đẹp và được yêu thương mỗi ngày nhé! 🌷`;

const LETTER_SIGNATURE = "Người yêu em mãi,<br>💕 Anh";

const TYPING_SPEED = 45; // ms per character
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
    // Lock scroll while envelope is visible
    document.body.classList.add('envelope-phase');
});

// --- Floating Hearts ---
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    if (!container) return;
    const hearts = ['💕', '💖', '🌸', '💌', '🩷', '✨'];
    for (let i = 0; i < 12; i++) {
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

// --- State ---
let isTyping = false;
let typingTimeout = null;

// --- Open Envelope ---
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const clickHint = document.getElementById('clickHint');

    // Unlock scroll so letter content is readable on mobile
    document.body.classList.remove('envelope-phase');

    // Open flap
    envelope.classList.add('opened');

    // After flap opens, hide envelope and show letter
    setTimeout(() => {
        envelopeContainer.classList.add('hidden');
        clickHint.classList.add('hidden');
        showLetter();
    }, 1000);
}

// --- Show Letter ---
function showLetter() {
    const letterContainer = document.getElementById('letterContainer');
    letterContainer.classList.add('show');

    // Type greeting first
    typeGreeting(() => {
        // Then type body
        typeLetterBody();
    });
}

// --- Type Greeting ---
function typeGreeting(callback) {
    const greetingEl = document.getElementById('letterGreeting');
    greetingEl.textContent = '';
    let i = 0;

    function typeChar() {
        if (i < LETTER_GREETING.length) {
            greetingEl.textContent += LETTER_GREETING[i];
            i++;
            typingTimeout = setTimeout(typeChar, TYPING_SPEED);
        } else {
            setTimeout(callback, 300);
        }
    }

    typeChar();
}

// --- Type Letter Body ---
function typeLetterBody() {
    const bodyEl = document.getElementById('letterBody');
    const cursor = document.getElementById('typingCursor');
    isTyping = true;

    // Clear body, keep cursor
    bodyEl.innerHTML = '';
    bodyEl.appendChild(cursor);

    let i = 0;
    const content = LETTER_CONTENT;

    function typeChar() {
        if (i < content.length) {
            // Insert character before cursor
            const char = content[i];
            if (char === '\n') {
                const br = document.createElement('br');
                bodyEl.insertBefore(br, cursor);
            } else {
                const textNode = document.createTextNode(char);
                bodyEl.insertBefore(textNode, cursor);
            }
            i++;
            typingTimeout = setTimeout(typeChar, TYPING_SPEED);
        } else {
            // Typing done!
            isTyping = false;
            cursor.style.display = 'none';
            onLetterComplete();
        }
    }

    typeChar();
}

// --- On Letter Complete ---
function onLetterComplete() {
    // Show signature
    setTimeout(() => {
        const sig = document.getElementById('letterSignature');
        sig.innerHTML = LETTER_SIGNATURE;
        sig.classList.add('show');
    }, 500);

    // Show heart
    setTimeout(() => {
        document.getElementById('letterHeart').classList.add('show');
    }, 1000);

    // Launch confetti!
    setTimeout(() => {
        launchConfetti();
    }, 1200);

    // Show choice modal after letter finishes + 5s delay
    setTimeout(() => {
        document.getElementById('choiceModal').classList.add('show');
    }, 8000);
}

// --- Replay Letter ---
function replayLetter() {
    // Hide choice modal
    document.getElementById('choiceModal').classList.remove('show');

    // Clear everything
    if (typingTimeout) clearTimeout(typingTimeout);

    document.getElementById('letterGreeting').textContent = '';
    const bodyEl = document.getElementById('letterBody');
    const cursor = document.getElementById('typingCursor');
    bodyEl.innerHTML = '';
    cursor.style.display = 'inline-block';
    bodyEl.appendChild(cursor);

    document.getElementById('letterSignature').classList.remove('show');
    document.getElementById('letterHeart').classList.remove('show');

    // Clear confetti
    document.getElementById('confettiContainer').innerHTML = '';

    // Restart typing
    setTimeout(() => {
        typeGreeting(() => {
            typeLetterBody();
        });
    }, 500);
}

// --- Go to Music Page ---
function goToMusic() {
    // Hide modal first
    document.getElementById('choiceModal').classList.remove('show');

    setTimeout(() => {
        if (typeof navigateWithCar === 'function') {
            navigateWithCar('music.html', 'forward');
        } else {
            window.location.href = 'music.html';
        }
    }, 300);
}

// --- Heart Confetti ---
function launchConfetti() {
    const container = document.getElementById('confettiContainer');
    const pieces = ['💖', '💕', '💗', '💓', '🌸', '🩷', '✨', '💝', '🎀', '🌷'];

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('span');
        piece.classList.add('confetti-piece');
        piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.fontSize = (Math.random() * 15 + 12) + 'px';
        piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        piece.style.animationDelay = (Math.random() * 2) + 's';

        // Confetti fall animation
        piece.animate([
            {
                transform: `translateY(-20px) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: (Math.random() * 3000 + 2000),
            delay: Math.random() * 2000,
            fill: 'forwards',
            easing: 'ease-in'
        });

        container.appendChild(piece);
    }

    // Clean up confetti after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 6000);
}
