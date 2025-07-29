/*
 * Smooth scrolling for anchor links
 * This code listens for clicks on any anchor tags with href starting with '#'
 * When clicked, it prevents the default jump and smoothly scrolls to the target section
 * It calculates the offset to account for the fixed header height
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Calculate the offset to adjust for fixed header height
            const headerOffset = document.querySelector('.header').offsetHeight;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            // Smoothly scroll to the calculated position
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*
 * Smooth scrolling for "Contacts" menu links
 * This code listens for clicks on any navigation links that end with '#contact'
 * It prevents the default jump and smoothly scrolls to the contact section on the current page
 * It calculates the offset to account for the fixed header height
 * Additionally, it checks if the current page is plants.html or accessories.html
 * For these pages, it ensures the product page section is visible before scrolling
 * This prevents the page from hiding content when scrolling to the contact section
 */
document.querySelectorAll('nav a[href$="#contact"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the contact section element by ID
        const targetSection = document.getElementById('contact');

        if (targetSection) {
            // Calculate the offset to adjust for fixed header height
            const headerOffset = document.querySelector('.header').offsetHeight;
            // Get the vertical position of the contact section relative to viewport
            const elementPosition = targetSection.getBoundingClientRect().top;
            // Calculate the final scroll position by adding current scroll and subtracting header height
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            // Determine the current page filename
            const currentPage = window.location.pathname.split('/').pop();

            if (currentPage === 'plants.html' || currentPage === 'accessories.html') {
                // For plants and accessories pages, ensure the product page section is visible
                const productPage = document.querySelector('.product-page.active');
                if (productPage) {
                    productPage.style.display = 'block';
                }
                // Smoothly scroll to the contact section
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // For other pages, just smoothly scroll to the contact section
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Handle product page navigation
function showProductPage(pageId) {
    // Hide main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // Hide all product pages
    document.querySelectorAll('.product-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected product page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top
        window.scrollTo({
            top: document.querySelector('.header').offsetHeight,
            behavior: 'smooth'
        });
    }
}

// Handle back to home
function showHomePage() {
    // Hide all product pages
    document.querySelectorAll('.product-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
    }
}

    // Add event listeners for product cards
    document.addEventListener('DOMContentLoaded', function() {
  
    // Handle navigation back to home sections
    document.querySelectorAll('nav a[href^="index.html#"], nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a link back to index.html sections, show home page first
            if (href.includes('index.html#') || href.startsWith('#')) {
                showHomePage();
                
                // Then handle the anchor navigation
                setTimeout(() => {
                    const targetId = href.includes('#') ? href.split('#')[1] : href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        e.preventDefault();
                        const headerOffset = document.querySelector('.header').offsetHeight;
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        });
    });
});

/* Image preview modal functionality */
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    modal.innerHTML = `
        <span class="image-modal-close">&times;</span>
        <img class="image-modal-content" src="" alt="Preview" />
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('.image-modal-content');
    const closeBtn = modal.querySelector('.image-modal-close');

    // Open modal on product item click
    document.querySelectorAll('.product-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-image-src');
            if (imgSrc) {
                modal.style.display = 'flex';
                modalImage.src = imgSrc;
                modalImage.alt = item.querySelector('.item-content h4')?.textContent || 'Preview';
            }
        });
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalImage.src = '';
        modalImage.alt = '';
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImage.src = '';
            modalImage.alt = '';
        }
    });
});

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

function submitForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Send the data to a server (FUTURE USE)
    console.log('Form submitted:', data);
    
    // Show success message using custom modal
    showCustomConfirmation('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

// Modal for confirmation
function showCustomConfirmation(message) {
    let modal = document.getElementById('custom-confirmation-modal');
    let backdrop = document.getElementById('custom-confirmation-backdrop');
    if (!modal) {
        
        // Backdrop
        backdrop = document.createElement('div');
        backdrop.id = 'custom-confirmation-backdrop';
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        backdrop.style.backdropFilter = 'blur(5px)';
        backdrop.style.zIndex = '9999';
        backdrop.style.display = 'none';
        document.body.appendChild(backdrop);

        // Modal
        modal = document.createElement('div');
        modal.id = 'custom-confirmation-modal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#222';
        modal.style.color = '#fff';
        modal.style.padding = '20px 30px';
        modal.style.borderRadius = '8px';
        modal.style.zIndex = '10000';
        modal.style.fontSize = '1.2rem';
        modal.style.textAlign = 'center';
        modal.style.maxWidth = '80%';
        modal.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
        modal.style.cursor = 'pointer';
        modal.addEventListener('click', () => {
            modal.style.display = 'none';
            backdrop.style.display = 'none';
        });
        document.body.appendChild(modal);
    }
    // Clear existing content
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }

    // Add message text
    const messagePara = document.createElement('p');
    messagePara.textContent = message;
    modal.appendChild(messagePara);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.marginTop = '15px';
    closeBtn.style.padding = '8px 16px';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.backgroundColor = '#689F38';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '1rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
    });
    modal.appendChild(closeBtn);

    modal.style.display = 'block';
    backdrop.style.display = 'block';
}
