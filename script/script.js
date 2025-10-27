const modal = document.getElementById('contactModal');
const contactBtn = document.getElementById('openContactForm');
const closeBtn = document.querySelector('.close-btn');
const contactForm = document.querySelector('.contact-form');
const confirmationMessage = document.getElementById('confirmationMessage');
const modalContent = modal ? modal.querySelector('.modal-content') : null;

let previouslyFocusedElement = null;
let focusableEls = [];
let firstFocusable = null;
let lastFocusable = null;

// ====== ACCESSIBILITY HELPERS ======
function updateFocusableElements() {
  if (!modal) return;
  focusableEls = Array.from(
    modal.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), ' +
      'textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => el.offsetParent !== null);
  firstFocusable = focusableEls[0] || modalContent;
  lastFocusable = focusableEls[focusableEls.length - 1] || modalContent;
}
function trapTabKey(e) {
  if (e.key !== 'Tab' || focusableEls.length === 0) return;
  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) { e.preventDefault(); lastFocusable.focus(); }
  } else {
    if (document.activeElement === lastFocusable) { e.preventDefault(); firstFocusable.focus(); }
  }
}
function onKeydown(e) { if (e.key === 'Escape') { e.preventDefault(); closeModal(); } }
function onWindowClick(e) { if (e.target === modal) closeModal(); }

function openModal() {
  if (!modal) return;
  previouslyFocusedElement = document.activeElement;
  modal.removeAttribute('hidden');
  modal.style.display = 'block';
  updateFocusableElements();
  (modalContent || modal).focus();
  document.addEventListener('keydown', onKeydown);
  modal.addEventListener('keydown', trapTabKey);
  window.addEventListener('click', onWindowClick);
}
function closeModal() {
  if (!modal) return;
  modal.setAttribute('hidden', '');
  modal.style.display = 'none';
  if (contactForm && confirmationMessage) {
    confirmationMessage.style.display = 'none';
    contactForm.style.display = 'block';
    clearAllErrors();
    contactForm.reset();
  }
  document.removeEventListener('keydown', onKeydown);
  modal.removeEventListener('keydown', trapTabKey);
  window.removeEventListener('click', onWindowClick);
  if (previouslyFocusedElement && previouslyFocusedElement.focus) previouslyFocusedElement.focus();
}

// Open/Close
if (contactBtn) contactBtn.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);

// ===================================================================
//                    CONTACT FORM INPUT VALIDATION
// ===================================================================

// email check 
function isValidEmail(value) {
  if (typeof value !== 'string') return false;

  const trimmed = value.trim();

  // Basic structure check: local@domain.tld
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Prevent consecutive dots and leading/trailing dots in local or domain
  const hasConsecutiveDots = /(\.\.)/.test(trimmed);
  const hasLeadingOrTrailingDot = /^\.|\.@|@\./.test(trimmed);

  return emailRegex.test(trimmed) && !hasConsecutiveDots && !hasLeadingOrTrailingDot;
}


// Allows only numbers as input
function isStrictlyNumeric(value) {
  return typeof value === 'string' && /^[0-9]+$/.test(value.trim());
}

// Show error text next to a field (creates or updates a .error-msg element)
function showError(field, message) {
  field.setAttribute('aria-invalid', 'true');

  let error = field.parentElement.querySelector('.error-msg');
  if (!error) {
    error = document.createElement('div');
    error.className = 'error-msg';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '4px';
    error.style.color = '#dc3545'; // Bootstrap danger color
    field.parentElement.appendChild(error);
  }
  error.textContent = message;
}

// Clear a field’s error
function clearError(field) {
  field.removeAttribute('aria-invalid');
  const error = field.parentElement.querySelector('.error-msg');
  if (error) error.textContent = '';
}

// Clear all errors (when closing / reopening)
function clearAllErrors() {
  if (!contactForm) return;
  Array.from(contactForm.elements).forEach(el => {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) clearError(el);
  });
}

// Input validation rules
function validateFormJS() {
  if (!contactForm) return false;

  const name = contactForm.querySelector('#name');
  const email = contactForm.querySelector('#email');
  const phone = contactForm.querySelector('#phone');
  const subject = contactForm.querySelector('#subject');
  const message = contactForm.querySelector('#message');

  clearAllErrors();

  let firstInvalid = null;

  // Name: required, min 2 chars. Allow number and special symbols (example: X AE A-XII)
  if (name && name.value.trim().length < 2) {
    showError(name, 'Please enter your name (at least 2 characters).');
    firstInvalid = firstInvalid || name;
  }

  // Email: required + format
  if (email && email.value.trim() === '') {
    showError(email, 'Please enter your email address.');
    firstInvalid = firstInvalid || email;
  } else if (email && !isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email address.');
    firstInvalid = firstInvalid || email;
  }


  // Contact Number : Optional. Check if input are all numbers and if lenght is less than 7
  if (phone && phone.value.trim() !== '') {
    const trimmed = phone.value.trim();

    if (!isStrictlyNumeric(trimmed)) {
      showError(phone, 'Contact number must contain digits only — no letters or symbols.');
      firstInvalid = firstInvalid || phone;
    } else if (trimmed.length < 7) {
      showError(phone, 'Please enter a valid contact number (at least 7 digits).');
      firstInvalid = firstInvalid || phone;
    }
  }
  
  // Subject: required
  if (subject && subject.value.trim() === '') {
    showError(subject, 'Please enter a subject.');
    firstInvalid = firstInvalid || subject;
  }

  // Message: required, min length
  if (message && message.value.trim().length < 10) {
    showError(message, 'Please provide a brief message (at least 10 characters).');
    firstInvalid = firstInvalid || message;
  }

  // Focus first invalid field
  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }
  return true;
}

// ====== Contact Form Submit Handling ====== 
if (contactForm && confirmationMessage) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // stop actual submit

    const ok = validateFormJS();
    if (!ok) return; // errors shown inline by JS

    // Success UX
    contactForm.style.display = 'none';
    confirmationMessage.style.display = 'block';

    // Clear values for next time
    contactForm.reset();

    // Auto-close in 3s
    setTimeout(closeModal, 3000);
  });

  // Live validation: clear error while typing
  contactForm.addEventListener('input', function (e) {
    const t = e.target;
    if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) {
      clearError(t);
    }
  });
}

// ====== SOCIAL + VISIT BUTTONS ======
function setupSocialMediaLinks() {
  const socialLinks = document.querySelectorAll('ul.navigation-links li[data-url]');
  socialLinks.forEach(li => {
    const url = li.getAttribute('data-url');
    const a = li.querySelector('a');
    if (a && url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
  });
}

function setupVisitButtons() {
  document.querySelectorAll('.visit-btn').forEach(btn => {
    const url = btn.getAttribute('data-url');
    if (url) btn.addEventListener('click', e => { e.preventDefault(); window.open(url, '_blank', 'noopener'); });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSocialMediaLinks();
  setupVisitButtons();
});

