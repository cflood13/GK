// Quick Quote Floating Form with Confetti
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('quick-quote-container');
    const toggle = document.getElementById('quick-quote-toggle');
    const widget = document.getElementById('quick-quote-widget');
    const closeBtn = document.getElementById('quick-quote-close');
    const form = document.getElementById('quick-quote-form');
    const successPanel = document.getElementById('quick-quote-success');
    const resetBtn = document.getElementById('quick-quote-reset');
    const canvas = document.getElementById('confetti-canvas');

    if (!toggle || !widget) return;

    // Toggle widget visibility
    toggle.addEventListener('click', () => {
        widget.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close widget
    closeBtn.addEventListener('click', () => {
        widget.classList.remove('active');
        toggle.classList.remove('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            widget.classList.remove('active');
            toggle.classList.remove('active');
        }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.quick-quote-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Log the submission (in production, send to server)
            console.log('Quick Quote Submission:', data);

            // Show success
            form.style.display = 'none';
            successPanel.style.display = 'block';

            // Fire confetti!
            launchConfetti();

        } catch (error) {
            console.error('Submission error:', error);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Reset form
    resetBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        successPanel.style.display = 'none';
    });

    // ========================================
    // Confetti Animation
    // ========================================
    function launchConfetti() {
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99999;
        `;

        const confettiCount = 150;
        const confetti = [];
        const colors = [
            '#d97706', // Amber
            '#f59e0b', // Light amber
            '#b45309', // Dark amber
            '#0f172a', // Slate
            '#fbbf24', // Yellow
            '#ffffff', // White
            '#34d399', // Green
        ];

        // Create confetti particles
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                velocityX: (Math.random() - 0.5) * 8,
                velocityY: Math.random() * 3 + 2,
                oscillationSpeed: Math.random() * 0.05 + 0.02,
                oscillationDistance: Math.random() * 40 + 20,
                phase: Math.random() * Math.PI * 2,
            });
        }

        let frame = 0;
        const maxFrames = 300; // ~5 seconds at 60fps

        function animate() {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((c, index) => {
                c.y += c.velocityY;
                c.x += c.velocityX + Math.sin(c.phase + frame * c.oscillationSpeed) * 2;
                c.rotation += c.rotationSpeed;
                c.velocityY += 0.05; // Gravity

                // Draw confetti
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate((c.rotation * Math.PI) / 180);
                ctx.fillStyle = c.color;
                ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
                ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
                ctx.restore();
            });

            if (frame < maxFrames) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        animate();
    }

    // Handle window resize for confetti canvas
    window.addEventListener('resize', () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});
