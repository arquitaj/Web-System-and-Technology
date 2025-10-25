const modal = document.getElementById('contactModal');
const contact_btn = document.getElementById('openContactForm');
const form_close_btn = document.querySelector('.close-btn');
const contactForm = document.querySelector('.contact-form');

const confirmationMessage = document.getElementById('confirmationMessage'); 

// Open the modal
if (contact_btn) {
    contact_btn.onclick = function() {
        if (modal) {
            modal.style.display = 'block';
        }
    }
}

// Close the modal via the 'x' button
if (form_close_btn) {
    form_close_btn.onclick = function() {
        if (modal) {
            modal.style.display = 'none';
        }
     
    }
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}


// --- NEW: Handle Form Submission and Closing ---

if (contactForm && confirmationMessage) { // Ensure both elements exist before adding the listener
    contactForm.addEventListener('submit', function(event) {
        // Prevent the browser from submitting the form the default way (which causes a page refresh)
        event.preventDefault();

        // Hide the form and show the confirmation message
        contactForm.style.display = 'none';
        confirmationMessage.style.display = 'block';

        // Reset the form fields (so they are clear if the user opens the modal again)
        // ⚠️ NOTE: Form reset only works if the form is hidden, but the fields haven't been removed from the DOM.
        contactForm.reset(); 

        // Set a timer to close the modal after 3 seconds (3000 milliseconds)
        setTimeout(function() {
            // Hide the modal completely
            modal.style.display = 'none';
            
            // IMPORTANT: Reset the form and confirmation message states for next time
            // Re-show the form and hide the confirmation message
            contactForm.style.display = 'block'; 
            confirmationMessage.style.display = 'none';
            
        }, 3000); // timeout 3000 milliseconds = 3 seconds
    });
}

// Function to handle the social media navigation
function setupSocialMediaLinks() {
    const socialLinks = document.querySelectorAll('ul.navigation-links li[data-url]');

    socialLinks.forEach(listItem => {
        
        const url = listItem.getAttribute('data-url');
        const anchor = listItem.querySelector('a');

        if (anchor && url) {
            anchor.setAttribute('href', url);
            
            // Open links in a new tab
            anchor.setAttribute('target', '_blank');
        }
    });
}

document.addEventListener('DOMContentLoaded', setupSocialMediaLinks);

// Function to handle project "visit" button clicks
document.addEventListener('DOMContentLoaded', function () {
  // Select all project "visit" buttons
  const visitButtons = document.querySelectorAll('.visit-btn');

  visitButtons.forEach(btn => {
    // Get the url from data-url attribute
    const url = btn.getAttribute('data-url');

    // Only attach listener if a URL exists
    if (url) {
      btn.addEventListener('click', function (event) {
        // Optional: prevent other handlers or form submits
        event.preventDefault();

        // Open URL in a new tab
        window.open(url, '_blank');
        
      });
    } else {
      // Optional: debug helper: console.warn if button missing url
      console.warn('visit-btn has no data-url:', btn);
    }
  });
});