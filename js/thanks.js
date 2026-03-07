/* ============================================
   🌸 THANKS PAGE — Happy Women's Day 8/3
   SVG Text Drawing Animation
   ============================================ */

// --- Auth Check: chỉ vào được từ gallery (nút END) ---
if (sessionStorage.getItem('unlocked') !== 'true') {
    window.location.href = 'index.html';
}

// --- Loading Screen ---
window.addEventListener('load', function () {
    setTimeout(function () {
        var ld = document.getElementById('loadingScreen');
        if (ld) ld.classList.add('hidden');
        setTimeout(startDrawing, 500);
    }, 1200);
});

// --- Floating Hearts Background ---
(function () {
    var c = document.getElementById('heartsBg');
    if (!c) return;
    var h = [''];
    for (var i = 0; i < 15; i++) {
        var s = document.createElement('span');
        s.classList.add('heart');
        s.textContent = h[Math.floor(Math.random() * h.length)];
        s.style.left = Math.random() * 100 + '%';
        s.style.fontSize = (Math.random() * 12 + 10) + 'px';
        s.style.animationDuration = (Math.random() * 8 + 7) + 's';
        s.style.animationDelay = (Math.random() * 10) + 's';
        s.style.opacity = Math.random() * 0.15 + 0.05;
        c.appendChild(s);
    }
})();

// --- Rising Hearts Background ---
(function () {
    var container = document.getElementById('risingHearts');
    if (!container) return;

    var heartChars = ['❤️', '💖', '💗', '💕', '💓', '🩷', '💝', '♥'];
    var colors = [
        'rgba(255,105,180,0.5)', 'rgba(255,20,147,0.4)', 'rgba(255,182,193,0.6)',
        'rgba(219,112,147,0.5)', 'rgba(255,192,203,0.5)', 'rgba(255,99,71,0.3)'
    ];

    function spawnHeart() {
        var el = document.createElement('span');
        el.className = 'rising-heart';
        el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];

        var size = Math.random() * 25 + 15;
        var x = Math.random() * 100;
        var dur = Math.random() * 5 + 5;
        var opacity = Math.random() * 0.4 + 0.3;
        var color = colors[Math.floor(Math.random() * colors.length)];

        el.style.left = x + '%';
        el.style.setProperty('--hsize', size + 'px');
        el.style.setProperty('--hdur', dur + 's');
        el.style.setProperty('--hdelay', '0s');
        el.style.setProperty('--hopacity', opacity);
        el.style.setProperty('--hglow', color);
        el.style.setProperty('--hsway1', (Math.random() * 40 - 20) + 'px');
        el.style.setProperty('--hsway2', (Math.random() * 50 - 25) + 'px');
        el.style.setProperty('--hsway3', (Math.random() * 40 - 20) + 'px');
        el.style.setProperty('--hsway4', (Math.random() * 30 - 15) + 'px');
        el.style.setProperty('--hsway5', (Math.random() * 20 - 10) + 'px');

        container.appendChild(el);
        el.addEventListener('animationiteration', function () {
            // Randomize again on each loop
            el.style.left = (Math.random() * 100) + '%';
            var newSize = Math.random() * 25 + 15;
            el.style.setProperty('--hsize', newSize + 'px');
            el.style.fontSize = newSize + 'px';
            el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
        });
    }

    // Initial burst
    for (var i = 0; i < 25; i++) {
        (function (delay) {
            setTimeout(function () {
                var el = document.createElement('span');
                el.className = 'rising-heart';
                el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                var size = Math.random() * 25 + 15;
                el.style.left = (Math.random() * 100) + '%';
                el.style.setProperty('--hsize', size + 'px');
                el.style.setProperty('--hdur', (Math.random() * 5 + 5) + 's');
                el.style.setProperty('--hdelay', '0s');
                el.style.setProperty('--hopacity', (Math.random() * 0.4 + 0.3));
                el.style.setProperty('--hglow', colors[Math.floor(Math.random() * colors.length)]);
                el.style.setProperty('--hsway1', (Math.random() * 40 - 20) + 'px');
                el.style.setProperty('--hsway2', (Math.random() * 50 - 25) + 'px');
                el.style.setProperty('--hsway3', (Math.random() * 40 - 20) + 'px');
                el.style.setProperty('--hsway4', (Math.random() * 30 - 15) + 'px');
                el.style.setProperty('--hsway5', (Math.random() * 20 - 10) + 'px');
                el.style.fontSize = size + 'px';
                container.appendChild(el);
                el.addEventListener('animationiteration', function () {
                    el.style.left = (Math.random() * 100) + '%';
                    el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
                });
            }, delay);
        })(i * 300);
    }

    // Continuous spawn
    setInterval(function () {
        spawnHeart();
        // Keep max ~30 hearts
        var hearts = container.querySelectorAll('.rising-heart');
        if (hearts.length > 35) {
            container.removeChild(hearts[0]);
        }
    }, 800);
})();

// --- Measure actual stroke length for each SVG text ---
function getStrokeLength(textEl) {
    // Try getComputedTextLength; use a generous fallback if unavailable
    if (textEl && textEl.getComputedTextLength) {
        var len = textEl.getComputedTextLength();
        // Multiply by a factor since stroke paths are longer than text length
        return Math.ceil(len * 3.5);
    }
    return 2000;
}

// --- Sparkle burst at a position ---
function createSparkles(x, y, count) {
    var colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFD700', '#FF85A2', '#FFA6C9'];
    for (var i = 0; i < count; i++) {
        var s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        s.style.background = colors[Math.floor(Math.random() * colors.length)];
        s.style.width = (Math.random() * 5 + 3) + 'px';
        s.style.height = s.style.width;

        var angle = (Math.PI * 2 * i) / count;
        var dist = Math.random() * 60 + 30;
        var tx = Math.cos(angle) * dist;
        var ty = Math.sin(angle) * dist;

        document.body.appendChild(s);

        s.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: 'translate(' + tx + 'px, ' + ty + 'px) scale(0)', opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'ease-out',
            fill: 'forwards',
            delay: Math.random() * 200
        });

        (function (el) {
            setTimeout(function () {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 1500);
        })(s);
    }
}

// --- Add decorative hearts around text ---
function addDecoHearts() {
    var stage = document.getElementById('drawingStage');
    if (!stage) return;

    var positions = [
        { top: '-20px', left: '-30px', size: '28px', delay: 0 },
        { top: '-15px', right: '-25px', size: '24px', delay: 200 },
        { top: '30%', left: '-40px', size: '22px', delay: 400 },
        { top: '30%', right: '-35px', size: '26px', delay: 600 },
        { bottom: '30px', left: '-20px', size: '20px', delay: 800 },
        { bottom: '25px', right: '-20px', size: '30px', delay: 1000 },
        { top: '50%', left: '-45px', size: '18px', delay: 300 },
        { top: '50%', right: '-40px', size: '20px', delay: 500 }
    ];

    var heartIcons = ['💕', '💖', '💗', '🌸', '✨', '🩷', '💝', '🌷'];

    positions.forEach(function (pos, i) {
        setTimeout(function () {
            var el = document.createElement('span');
            el.className = 'deco-heart';
            el.textContent = heartIcons[i % heartIcons.length];
            el.style.fontSize = pos.size;
            el.style.position = 'absolute';
            if (pos.top) el.style.top = pos.top;
            if (pos.bottom) el.style.bottom = pos.bottom;
            if (pos.left) el.style.left = pos.left;
            if (pos.right) el.style.right = pos.right;
            stage.appendChild(el);
            // Trigger pop animation
            requestAnimationFrame(function () {
                el.classList.add('pop');
            });
        }, pos.delay);
    });
}

// --- Main Drawing Sequence ---
function startDrawing() {
    var lineHappy = document.getElementById('lineHappy');
    var lineWomen = document.getElementById('lineWomen');
    var lineDay = document.getElementById('lineDay');
    var lineDate = document.getElementById('lineDate');
    var subtitle = document.getElementById('subtitle');
    var glowRing = document.getElementById('glowRing');

    // Measure & set accurate stroke lengths
    var lines = [lineHappy, lineWomen, lineDay, lineDate];
    lines.forEach(function (el) {
        if (!el) return;
        var len = getStrokeLength(el);
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
        el.style.setProperty('--dash-length', len);
    });

    // Show glow ring
    if (glowRing) glowRing.classList.add('show');

    // Sequence: draw each line with delay
    var delay = 0;

    // 1. "Happy"
    setTimeout(function () {
        lineHappy.classList.add('animate');
        var rect = lineHappy.getBoundingClientRect();
        createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    }, delay);

    delay += 2200;

    // 2. "Women's"
    setTimeout(function () {
        lineWomen.classList.add('animate');
        var rect = lineWomen.getBoundingClientRect();
        createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    }, delay);

    delay += 2500;

    // 3. "Day"
    setTimeout(function () {
        lineDay.classList.add('animate');
        var rect = lineDay.getBoundingClientRect();
        createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
    }, delay);

    delay += 1800;

    // 4. "8 / 3"
    setTimeout(function () {
        lineDate.classList.add('animate');
        var rect = lineDate.getBoundingClientRect();
        createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
    }, delay);

    delay += 2200;

    // 5. Show subtitle, decorations, GIFs
    setTimeout(function () {
        subtitle.classList.add('show');
        addDecoHearts();

        // Big sparkle burst in center
        var cx = window.innerWidth / 2;
        var cy = window.innerHeight / 2;
        createSparkles(cx, cy, 30);
    }, delay);
}
