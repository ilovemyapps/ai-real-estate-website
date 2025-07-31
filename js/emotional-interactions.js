// 🦢 Emotional Interactions - Elegant & Fluid

// 🎭 Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

// 🌟 Initialize Scroll Animations
function initScrollAnimations() {
  // Add entrance animation class to key elements
  const elementsToAnimate = [
    '.home-hero-heading',
    '.benefits-heading-wrapper',
    '.pricing-column',
    '.faq-block',
    '.style-guide-block'
  ];
  
  elementsToAnimate.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add('entrance-animation');
      element.style.transitionDelay = `${index * 0.1}s`;
      animateOnScroll.observe(element);
    });
  });
}

// 💰 Enhanced Price Flip Animation & Toggle Switch
function initPriceFlipAnimation() {
  const pricingTabs = document.querySelector('[data-current]');
  const tabLinks = document.querySelectorAll('[data-w-tab]');
  
  if (!pricingTabs || !tabLinks.length) return;
  
  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = e.currentTarget.getAttribute('data-w-tab');
      const currentTab = pricingTabs.getAttribute('data-current');
      
      // Don't animate if clicking the same tab
      if (targetTab === currentTab) return;
      
      // Update data-current attribute
      pricingTabs.setAttribute('data-current', targetTab);
      
      // Update active states
      tabLinks.forEach(tab => tab.classList.remove('w--current'));
      e.currentTarget.classList.add('w--current');
      
      // Add flip animation to price elements
      const priceElements = document.querySelectorAll('.per-month-pricing-wrapper .body-small');
      priceElements.forEach(price => {
        price.style.animation = 'number-flip 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
          price.style.animation = '';
        }, 600);
      });
      
      // Toggle pricing panels
      const monthlyPanel = document.querySelector('[data-w-tab="Monthly"].pricing-tab-panel');
      const yearlyPanel = document.querySelector('[data-w-tab="Yearly"].pricing-tab-panel');
      
      if (monthlyPanel && yearlyPanel) {
        if (targetTab === 'Monthly') {
          monthlyPanel.classList.add('w--tab-active');
          yearlyPanel.classList.remove('w--tab-active');
        } else {
          yearlyPanel.classList.add('w--tab-active');
          monthlyPanel.classList.remove('w--tab-active');
        }
      }
      
      // Add ripple effect
      createRippleEffect(e);
    });
  });
}

// 🌊 Ripple Effect for Toggle Switch
function createRippleEffect(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple-effect 0.6s linear';
  ripple.style.pointerEvents = 'none';
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple keyframes to document
const rippleStyles = `
@keyframes ripple-effect {
  to {
    transform: scale(2);
    opacity: 0;
  }
}
`;

if (!document.querySelector('#ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}

// 🏠 House Icon Bounce Effect
function initHouseIconAnimation() {
  // Find any house-related icons or logos
  const houseElements = document.querySelectorAll('img[src*="logo"], .logo, [class*="logo"]');
  
  houseElements.forEach(element => {
    element.classList.add('house-icon');
  });
}

// 📋 Enhanced FAQ Interactions
function initFAQAnimations() {
  const faqBlocks = document.querySelectorAll('.faq-block');
  
  faqBlocks.forEach(block => {
    block.addEventListener('click', () => {
      // Add gentle pulse effect on click
      block.style.transform = 'scale(0.98)';
      setTimeout(() => {
        block.style.transform = '';
      }, 150);
    });
  });
}

// 🎨 Dynamic Color Theming
function initDynamicTheming() {
  // Add success sparkle to success elements
  const successElements = document.querySelectorAll('.per-month-pricing-wrapper.green, .success-state');
  successElements.forEach(element => {
    element.classList.add('success-sparkle');
  });
  
  // Add floating animation to certain elements
  const floatingElements = document.querySelectorAll('.benefits-tab-image, .style-guide-block img');
  floatingElements.forEach((element, index) => {
    element.classList.add('floating-element');
    element.style.animationDelay = `${index * 0.5}s`;
  });
}

// 🌊 Smooth Scroll Enhancement
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 🎪 Cursor Magic Effects
function initCursorEffects() {
  const interactiveElements = document.querySelectorAll(
    '.primary-button, .faq-block, .pricing-column, .style-guide-block'
  );
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      document.body.style.cursor = 'pointer';
    });
    
    element.addEventListener('mouseleave', () => {
      document.body.style.cursor = 'default';
    });
  });
}

// 🚀 Performance-Optimized Animation Controller
function initPerformanceOptimizations() {
  // Reduce animations on low-performance devices
  const isLowPerformance = navigator.hardwareConcurrency < 4 || 
                          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isLowPerformance) {
    document.documentElement.style.setProperty('--duration-entrance', '0.3s');
    document.documentElement.style.setProperty('--duration-gentle', '0.25s');
  }
  
  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    const animatedElements = document.querySelectorAll('.floating-element, .loading-state');
    animatedElements.forEach(element => {
      element.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
  });
}

// 🎵 Initialize All Emotional Interactions
function initEmotionalDesign() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitializations);
  } else {
    runInitializations();
  }
}

function runInitializations() {
  console.log('🦢 Initializing Emotional Design System...');
  
  try {
    initScrollAnimations();
    initPriceFlipAnimation();
    initHouseIconAnimation();
    initFAQAnimations();
    initDynamicTheming();
    initSmoothScrolling();
    initCursorEffects();
    initPerformanceOptimizations();
    
    console.log('✨ Emotional Design System Ready!');
  } catch (error) {
    console.warn('🎭 Some animations may not work:', error);
  }
}

// 🎬 Action!
initEmotionalDesign();

// 🌟 Export for external use
window.EmotionalDesign = {
  reinitialize: runInitializations,
  addEntranceAnimation: (element) => {
    element.classList.add('entrance-animation');
    animateOnScroll.observe(element);
  }
};