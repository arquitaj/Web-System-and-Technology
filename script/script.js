// // Get the modal element
// const modal = document.getElementById('contactModal');

// // Get the button that opens the modal
// const contact_btn = document.getElementById('openContactForm');

// // Get the <span> element that closes the modal
// const form_close_btn = document.querySelector('.close-btn');

// // NEW: Get the form element
// const contactForm = document.querySelector('.contact-form');

// // --- Standard Modal Control ---

// // Open the modal
// contact_btn.onclick = function() {
//   modal.style.display = 'block';
// }

// // Close the modal via the 'x' button
// form_close_btn.onclick = function() {
//   modal.style.display = 'none';
// }

// // --- NEW: Handle Form Submission and Closing ---

// contactForm.addEventListener('submit', function(event) {
//     // 1. Prevent the browser from submitting the form the default way (which causes a page refresh)
//     event.preventDefault();

//     // 2. Add your logic for sending the form data here (e.g., using fetch() or XMLHttpRequest)
//     //    For this example, we'll just log a message:
//     console.log("Form submitted successfully! Closing modal...");

//   // 3. Hide the form and show the confirmation message
//     contactForm.style.display = 'none';
//     confirmationMessage.style.display = 'block';

//     // 4. Reset the form fields (so they are clear if the user opens the modal again)
//     contactForm.reset();

//     // 5. Set a timer to close the modal after 3 seconds (3000 milliseconds)
//     setTimeout(function() {
//         // Hide the modal completely
//         modal.style.display = 'none';
        
//         // IMPORTANT: Reset the form and confirmation message states for next time
//         contactForm.style.display = 'block';
//         confirmationMessage.style.display = 'none';
        
//     }, 4000); // Modal closes after 5 seconds
// });




//   // // Function to handle the social media navigation
//   function setupSocialMediaLinks() {
//       // Select all <li> elements that have a 'data-url' attribute within navigation-links
//       const socialLinks = document.querySelectorAll('ul.navigation-links li[data-url]');

//       socialLinks.forEach(listItem => {
//           // Get the intended URL from the 'data-url' attribute
//           const url = listItem.getAttribute('data-url');
          
//           // Find the <a> tag inside the <li>
//           const anchor = listItem.querySelector('a');

//           if (anchor && url) {
//               // Set the href attribute of the <a> tag to the correct URL
//               anchor.setAttribute('href', url);
              
//               // Optional: Add target="_blank" to open links in a new tab
//               anchor.setAttribute('target', '_blank');
//           }
//       });
//   }

//   // Call the function once the DOM is fully loaded
//   document.addEventListener('DOMContentLoaded', setupSocialMediaLinks);

// --- Element Selection ---

// Get the modal element
const modal = document.getElementById('contactModal');

// Get the button that opens the modal
const contact_btn = document.getElementById('openContactForm');

// Get the <span> element that closes the modal
const form_close_btn = document.querySelector('.close-btn');

// NEW: Get the form element
const contactForm = document.querySelector('.contact-form');

// NEW: Get the confirmation message element (ASSUMES you have an element with this ID, e.g., a <div>)
// 🚨 FIX: This was missing and caused a 'ReferenceError' inside the submit handler.
const confirmationMessage = document.getElementById('confirmationMessage'); 

// --- Standard Modal Control ---

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
        // 1. Prevent the browser from submitting the form the default way (which causes a page refresh)
        event.preventDefault();

        // 2. Add your logic for sending the form data here (e.g., using fetch() or XMLHttpRequest)
        //    For this example, we'll just log a message:
        console.log("Form submitted successfully! Closing modal...");

        // 3. Hide the form and show the confirmation message
        contactForm.style.display = 'none';
        confirmationMessage.style.display = 'block';

        // 4. Reset the form fields (so they are clear if the user opens the modal again)
        // ⚠️ NOTE: Form reset only works if the form is hidden, but the fields haven't been removed from the DOM.
        contactForm.reset(); 

        // 5. Set a timer to close the modal after 3 seconds (3000 milliseconds)
        setTimeout(function() {
            // Hide the modal completely
            modal.style.display = 'none';
            
            // IMPORTANT: Reset the form and confirmation message states for next time
            // Re-show the form and hide the confirmation message
            contactForm.style.display = 'block'; 
            confirmationMessage.style.display = 'none';
            
        }, 3000); // 🚨 ADJUSTED to 3 seconds for consistency with the comment above it.
    });
}


// ----------------------------------------------------------------------
// // Function to handle the social media navigation
function setupSocialMediaLinks() {
    // Select all <li> elements that have a 'data-url' attribute within navigation-links
    const socialLinks = document.querySelectorAll('ul.navigation-links li[data-url]');

    socialLinks.forEach(listItem => {
        // Get the intended URL from the 'data-url' attribute
        const url = listItem.getAttribute('data-url');
        
        // Find the <a> tag inside the <li>
        const anchor = listItem.querySelector('a');

        if (anchor && url) {
            // Set the href attribute of the <a> tag to the correct URL
            anchor.setAttribute('href', url);
            
            // Optional: Add target="_blank" to open links in a new tab
            anchor.setAttribute('target', '_blank');
        }
    });
}

// Call the function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupSocialMediaLinks);