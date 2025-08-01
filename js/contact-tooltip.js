// Professional Contact Sales Tooltip with Copy-to-Clipboard
// Enhanced user experience for sales inquiries

document.addEventListener('DOMContentLoaded', function() {
  // Initialize contact sales tooltips
  initContactSalesTooltips();
});

function initContactSalesTooltips() {
  const contactButtons = document.querySelectorAll('.contact-sales-tooltip');
  
  contactButtons.forEach(button => {
    // Add click handler for copy-to-clipboard
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const email = this.getAttribute('data-tooltip');
      
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
          showCopySuccess(this);
        }).catch(() => {
          fallbackCopyTextToClipboard(email, this);
        });
      } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(email, this);
      }
    });
    
    // Enhanced keyboard accessibility
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, button) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess(button);
    } else {
      showCopyError(button);
    }
  } catch (err) {
    showCopyError(button);
  }
  
  document.body.removeChild(textArea);
}

// Show success feedback
function showCopySuccess(button) {
  const originalText = button.textContent;
  
  // Temporarily change button text
  button.textContent = '📧 Copied!';
  button.style.background = 'linear-gradient(135deg, #00d084 0%, #00b875 100%)';
  button.style.borderColor = '#00d084';
  button.style.color = 'white';
  
  // Create floating success message
  createFloatingMessage('📧 Email copied to clipboard!', 'success');
  
  // Reset button after 2 seconds
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
    button.style.borderColor = '';
    button.style.color = '';
  }, 2000);
}

// Show error feedback
function showCopyError(button) {
  const email = button.getAttribute('data-tooltip');
  
  // Create floating error message with email
  createFloatingMessage(`Please copy manually: ${email}`, 'error');
  
  // Brief visual feedback
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 150);
}

// Create floating notification message
function createFloatingMessage(text, type = 'success') {
  const message = document.createElement('div');
  message.textContent = text;
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'rgba(0, 208, 132, 0.95)' : 'rgba(255, 107, 53, 0.95)'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    font-size: 14px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateX(400px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
  `;
  
  document.body.appendChild(message);
  
  // Slide in
  setTimeout(() => {
    message.style.transform = 'translateX(0)';
  }, 10);
  
  // Slide out and remove
  setTimeout(() => {
    message.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, 3000);
}

// Export for external use
window.ContactTooltip = {
  init: initContactSalesTooltips
};