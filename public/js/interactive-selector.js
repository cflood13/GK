/**
 * Interactive Selector Component
 * Adapted from 21st.dev for vanilla JS/EJS
 */

const InteractiveSelector = {
  init() {
    const containers = document.querySelectorAll('.interactive-selector');
    containers.forEach(container => this.create(container));
  },

  create(container) {
    const optionsContainer = container.querySelector('.selector-options');
    const options = optionsContainer.querySelectorAll('.selector-option');
    let activeIndex = 0;

    // Set initial active state
    options[0]?.classList.add('active');

    // Animate options in on load
    options.forEach((option, index) => {
      setTimeout(() => {
        option.classList.add('animated');
      }, 180 * index);
    });

    // Click handlers
    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        if (index !== activeIndex) {
          options[activeIndex].classList.remove('active');
          option.classList.add('active');
          activeIndex = index;
        }
      });
    });
  }
};

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  InteractiveSelector.init();
});
