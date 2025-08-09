document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('serviceSearchInput');
    const serviceCards = document.querySelectorAll('.service-card');
    const categories = document.querySelectorAll('.service-category');
    const noResultsMessage = document.getElementById('no-results');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCardsCount = 0;

            // Filter service cards
            serviceCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'flex';
                    visibleCardsCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide or show categories based on visible cards
            categories.forEach(category => {
                const visibleCardsInCategory = category.querySelectorAll('.service-card[style*="display: flex"]');
                if (visibleCardsInCategory.length > 0) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });

            // Show or hide the "no results" message
            if (visibleCardsCount === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    }
    
    // Animate on load functionality (optional, but good for consistency)
    const animatedElements = document.querySelectorAll('.animate-on-load');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });


});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Definitive Overlay Mobile Navigation ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-nav__close-btn');
    const bodyEl = document.body;
    // NEW: Select all the links inside the mobile menu
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    function openMenu() {
        navToggle.setAttribute('aria-expanded', 'true');
        mobileNavOverlay.setAttribute('data-visible', 'true');
        bodyEl.classList.add('nav-is-open');
    }

    function closeMenu() {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNavOverlay.setAttribute('data-visible', 'false');
        bodyEl.classList.remove('nav-is-open');
    }

    if (navToggle && mobileNavOverlay && closeBtn) {
        navToggle.addEventListener('click', () => {
            const isVisible = mobileNavOverlay.getAttribute('data-visible') === 'true';
            if (isVisible) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        closeBtn.addEventListener('click', closeMenu);

        // NEW: Add event listeners to all mobile nav links to close the menu on click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    // --- Chat Widget Functionality ---
    const chatWidget = document.querySelector('.chat-widget');
    if (chatWidget) {
        const chatButton = chatWidget.querySelector('.chat-widget__button');
        const closeChatButton = chatWidget.querySelector('.chat-widget__close-btn');
        const messagesContainer = chatWidget.querySelector('.chat-widget__messages');
        const chatForm = chatWidget.querySelector('.chat-widget__input-form');
        const chatInput = chatWidget.querySelector('.chat-widget__input');

        if (chatButton && closeChatButton && chatForm) {
            chatButton.addEventListener('click', () => chatWidget.classList.toggle('is-open'));
            closeChatButton.addEventListener('click', () => chatWidget.classList.remove('is-open'));
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const userInput = chatInput.value.trim();
                if (userInput) {
                    const addMessage = (text, sender) => {
                        if (!messagesContainer) return;
                        const messageElement = document.createElement('div');
                        messageElement.classList.add('message', `message--${sender}`);
                        messageElement.textContent = text;
                        messagesContainer.appendChild(messageElement);
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    };
                    addMessage(userInput, 'user');
                    chatInput.value = '';
                    setTimeout(() => addMessage('پیام شما دریافت شد.', 'support'), 1500);
                }
            });
        }
    }

    // --- Scroll Animation Functionality ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
});

