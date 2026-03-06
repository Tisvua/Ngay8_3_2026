/* ============================================
   📸 GALLERY PAGE — JavaScript
   ============================================ */

// ====== CẤU HÌNH HÌNH ẢNH ======
// 👉 Thêm ảnh vào đây. Đặt file ảnh trong thư mục assets/images/
// 👉 Nếu chưa có ảnh, sẽ hiện ảnh placeholder 2D cute
const photos = [
    {
        src: "assets/images/photo1.jpg",
        caption: "Lần đầu chúng mình gặp nhau 💕",
        date: "01/01/2025"
    },
    {
        src: "assets/images/photo2.jpg",
        caption: "Buổi hẹn hò đầu tiên 🌸",
        date: "14/02/2025"
    },
    {
        src: "assets/images/photo3.jpg",
        caption: "Đi chơi Noel cùng nhau 🎄",
        date: "25/12/2025"
    },
    {
        src: "assets/images/photo4.jpg",
        caption: "Sinh nhật em 🎂",
        date: "15/03/2025"
    },
    {
        src: "assets/images/photo5.jpg",
        caption: "Một ngày bình yên bên nhau ☀️",
        date: "20/06/2025"
    },
    {
        src: "assets/images/photo6.jpg",
        caption: "Kỷ niệm của chúng mình 💖",
        date: "08/03/2026"
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
    const hearts = ['💕', '💖', '🌸', '🩷', '📸', '✨'];
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

// --- Render Gallery ---
const galleryGrid = document.getElementById('galleryGrid');
let lightboxIndex = 0;

// Cute placeholder icons for missing images
const placeholderIcons = ['🌸', '💕', '📸', '🎀', '💖', '🌷', '🦋', '⭐'];

function renderGallery() {
    if (photos.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-empty">
                <div class="empty-icon">📸</div>
                <h3>Chưa có ảnh nào!</h3>
                <p>Thêm ảnh vào thư mục <strong>assets/images/</strong><br>
                và cập nhật danh sách trong <strong>js/gallery.js</strong></p>
            </div>
        `;
        return;
    }

    galleryGrid.innerHTML = photos.map((photo, i) => {
        const rotation = (Math.random() * 6 - 3).toFixed(1);
        const icon = placeholderIcons[i % placeholderIcons.length];
        return `
            <div class="photo-card" style="--rotation: ${rotation}deg" data-index="${i}">
                <img src="${photo.src}" alt="${photo.caption}" 
                     onerror="this.outerHTML='<div class=\\'placeholder-photo\\'><span class=\\'ph-icon\\'>${icon}</span><span class=\\'ph-text\\'>Thêm ảnh #${i + 1}</span></div>'"
                     loading="lazy">
                <div class="photo-caption">${photo.caption}</div>
                <div class="photo-date">${photo.date}</div>
            </div>
        `;
    }).join('');

    // Add click events
    document.querySelectorAll('.photo-card').forEach((card) => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            openLightbox(index);
        });
    });

    // Staggered fade-in animation
    const cards = document.querySelectorAll('.photo-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    // Fallback: make all visible after 1s
    setTimeout(() => {
        cards.forEach(card => card.classList.add('visible'));
    }, 1000);
}

// --- Lightbox ---
function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function lightboxPrev() {
    lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length;
    updateLightbox();
}

function lightboxNext() {
    lightboxIndex = (lightboxIndex + 1) % photos.length;
    updateLightbox();
}

function updateLightbox() {
    const photo = photos[lightboxIndex];
    const img = document.getElementById('lightboxImg');
    img.src = photo.src;
    img.alt = photo.caption;
    document.getElementById('lightboxCaption').textContent = photo.caption;
    document.getElementById('lightboxDate').textContent = photo.date;
    document.getElementById('lightboxCounter').textContent = `${lightboxIndex + 1} / ${photos.length}`;
}

// --- Keyboard Navigation ---
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
});

// --- Touch Swipe for Lightbox ---
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.getElementById('lightbox').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) lightboxNext();
        else lightboxPrev();
    }
}, { passive: true });

// --- Initialize ---
renderGallery();
