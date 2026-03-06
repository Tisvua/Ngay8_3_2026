/* ============================================
   🚗 CAR PAGE TRANSITION — JavaScript
   Shared across all pages (menu + content pages)
   ============================================ */

(function () {
    const COVER_DURATION = 1300;
    const REVEAL_DURATION = 1100;

    /**
     * Build the transition overlay DOM.
     * direction: 'forward' | 'backward'
     * phase: 'cover' | 'reveal'
     */
    function createOverlay(direction, phase) {
        const overlay = document.createElement('div');
        overlay.className = `car-transition-overlay ${direction} ${phase}`;

        overlay.innerHTML = `
            <div class="car-curtain">
                <div class="car-group">
                    <span class="car-rope-heart">💗</span>
                    <span class="car-rope-heart">💗</span>
                    <span class="car-rope-heart">💗</span>
                    <span class="car-main-emoji">🚗</span>
                </div>
                <div class="car-curtain-center">
                    <span class="car-curtain-icon">💕</span>
                    <span class="car-curtain-text">Đợi chút nha~</span>
                </div>
                <div class="car-curtain-deco">
                    <span class="deco-item" style="top:15%;left:20%">🌸</span>
                    <span class="deco-item" style="top:70%;left:75%">✨</span>
                    <span class="deco-item" style="top:30%;left:80%">💖</span>
                    <span class="deco-item" style="top:75%;left:15%">🩷</span>
                    <span class="deco-item" style="top:50%;left:50%">🌷</span>
                </div>
            </div>
        `;

        return overlay;
    }

    /**
     * Navigate to `url` with a car-pulling-page transition.
     * direction = 'forward'  → car drives left-to-right
     * direction = 'backward' → car drives right-to-left
     */
    window.navigateWithCar = function (url, direction) {
        direction = direction || 'forward';

        // Prevent double-trigger
        if (document.querySelector('.car-transition-overlay')) return;

        const overlay = createOverlay(direction, 'cover');
        document.body.appendChild(overlay);

        // Store direction so the target page can play the reveal
        sessionStorage.setItem('car_dir', direction);

        setTimeout(function () {
            window.location.href = url;
        }, COVER_DURATION);
    };

    // On every page load, check if we need to reveal
    document.addEventListener('DOMContentLoaded', function () {
        var dir = sessionStorage.getItem('car_dir');
        if (dir) {
            sessionStorage.removeItem('car_dir');

            var overlay = createOverlay(dir, 'reveal');
            document.body.appendChild(overlay);

            setTimeout(function () {
                if (overlay.parentNode) overlay.remove();
            }, REVEAL_DURATION + 200);
        }
    });
})();
