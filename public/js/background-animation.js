/**
 * Background Gradient Animation (adapted from 21st.dev)
 * Vanilla JS implementation with mouse interactivity
 *
 * Usage:
 * 1. Add a container with class="bg-gradient-animation" and a theme class (optional)
 * 2. Call BackgroundGradientAnimation.init() or use data-bg-animation attribute
 *
 * Themes: theme-dark, theme-construction, theme-sunset (or default blue/orange)
 */

const BackgroundGradientAnimation = {
  instances: new Map(),

  /**
   * Initialize all background animations on the page
   */
  init() {
    document.querySelectorAll('.bg-gradient-animation').forEach(container => {
      if (!this.instances.has(container)) {
        this.create(container);
      }
    });
  },

  /**
   * Create animation for a specific container
   * @param {HTMLElement} container - The container element with .bg-gradient-animation class
   * @param {Object} options - Configuration options
   */
  create(container, options = {}) {
    const interactive = options.interactive !== false;

    // Create the inner structure
    const wrapper = document.createElement('div');
    wrapper.className = 'bg-gradient-animation-wrapper';
    wrapper.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%;';

    // SVG filter for blur effect
    wrapper.innerHTML = `
      <svg class="blur-filter" style="display: none;">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div class="gradients-container">
        <div class="gradient-blob gradient-blob-1"></div>
        <div class="gradient-blob gradient-blob-2"></div>
        <div class="gradient-blob gradient-blob-3"></div>
        <div class="gradient-blob gradient-blob-4"></div>
        <div class="gradient-blob gradient-blob-5"></div>
        ${interactive ? '<div class="gradient-blob-interactive"></div>' : ''}
      </div>
    `;

    // Ensure container has relative positioning
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') {
      container.style.position = 'relative';
    }

    // Insert wrapper as first child
    container.insertBefore(wrapper, container.firstChild);

    // Set up mouse tracking for interactive blob
    if (interactive) {
      const interactiveBlob = wrapper.querySelector('.gradient-blob-interactive');
      const state = {
        curX: 0,
        curY: 0,
        tgX: 0,
        tgY: 0,
        animationId: null
      };

      const animate = () => {
        // Smooth easing toward target position
        state.curX += (state.tgX - state.curX) / 20;
        state.curY += (state.tgY - state.curY) / 20;

        interactiveBlob.style.transform = `translate(${Math.round(state.curX)}px, ${Math.round(state.curY)}px)`;

        state.animationId = requestAnimationFrame(animate);
      };

      const handleMouseMove = (event) => {
        const rect = wrapper.getBoundingClientRect();
        state.tgX = event.clientX - rect.left;
        state.tgY = event.clientY - rect.top;
      };

      wrapper.addEventListener('mousemove', handleMouseMove);
      state.animationId = requestAnimationFrame(animate);

      // Store instance for cleanup
      this.instances.set(container, {
        wrapper,
        state,
        cleanup: () => {
          wrapper.removeEventListener('mousemove', handleMouseMove);
          if (state.animationId) {
            cancelAnimationFrame(state.animationId);
          }
        }
      });
    } else {
      this.instances.set(container, { wrapper, cleanup: () => {} });
    }

    return wrapper;
  },

  /**
   * Destroy animation for a specific container
   * @param {HTMLElement} container
   */
  destroy(container) {
    const instance = this.instances.get(container);
    if (instance) {
      instance.cleanup();
      instance.wrapper.remove();
      this.instances.delete(container);
    }
  },

  /**
   * Destroy all animations
   */
  destroyAll() {
    this.instances.forEach((instance, container) => {
      this.destroy(container);
    });
  }
};

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BackgroundGradientAnimation.init());
} else {
  BackgroundGradientAnimation.init();
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BackgroundGradientAnimation;
}
