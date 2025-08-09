document.addEventListener('DOMContentLoaded', () => {
    // --- 1. منوی موبایل با دکمه بستن ---
// --- 1. منوی موبایل نهایی و بهینه ---
const navToggle = document.querySelector('.mobile-nav-toggle');
const closeBtn = document.querySelector('.mobile-nav__close-btn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
const bodyEl = document.body;


// یک تابع برای باز و بسته کردن منو
function toggleMenu() {
    bodyEl.classList.toggle('nav-is-open');
}

// فقط در صورتی که دکمه همبرگری وجود دارد، event listener ها را اضافه کن
if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}
    // --- 2. ویجت چت (ارتباط با ما) ---
    const chatWidget = document.querySelector('.chat-widget');
    if (chatWidget) {
        const chatButton = chatWidget.querySelector('.chat-widget__button');
        const closeChatButton = chatWidget.querySelector('.chat-widget__close-btn');
        const messagesContainer = chatWidget.querySelector('.chat-widget__messages');
        const chatForm = chatWidget.querySelector('.chat-widget__input-form');
        const chatInput = chatWidget.querySelector('.chat-widget__input');

        if (chatButton && closeChatButton) {
            chatButton.addEventListener('click', () => {
                chatWidget.classList.toggle('is-open');
            });
            closeChatButton.addEventListener('click', () => {
                chatWidget.classList.remove('is-open');
            });
        }
        if (chatForm && chatInput) {
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
                    setTimeout(() => {
                        addMessage('پیام شما دریافت شد. اپراتورهای ما به زودی پاسخ خواهند داد.', 'support');
                    }, 1500);
                }
            });
        }
    }

    // --- 3. ویجت تماس سریع ---
    const quickContactWidget = document.getElementById('quickContactWidget');
    const quickContactToggle = document.getElementById('quickContactToggle');
    if (quickContactWidget && quickContactToggle) {
        quickContactToggle.addEventListener('click', () => {
            quickContactWidget.classList.toggle('is-open');
        });
    }

    // --- 4. انیمیشن اسکرول ---
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

    // --- 5. آکاردئون (سرویس و FAQ) ---
    const accordionItems = document.querySelectorAll('.accordion__item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        if (header) {
            header.addEventListener('click', () => {
                // بستن همه قبل از باز کردن جدید
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('is-open');
                        const otherContent = otherItem.querySelector('.accordion__content');
                        if (otherContent) otherContent.style.maxHeight = '0px';
                    }
                });
                // باز/بستن آیتم فعلی
                const content = item.querySelector('.accordion__content');
                const isOpen = item.classList.contains('is-open');
                if (!isOpen) {
                    item.classList.add('is-open');
                    if (content) content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    item.classList.remove('is-open');
                    if (content) content.style.maxHeight = '0px';
                }
            });
        }
    });

    // --- 6. انیمیشن ترنزیشن صفحه ---
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (
                href &&
                !href.startsWith('#') &&
                !href.startsWith('tel:') &&
                !this.hasAttribute('target')
            ) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // زمان باید با CSS یکی باشد
            }
        });
    });

    // --- 7. جستجوی زنده مقالات ---
    const searchInput = document.getElementById('articleSearch');
    const articlesGrid = document.querySelector('.articles__grid');
    const noResultsMessage = document.getElementById('noResultsMessage');
    if (searchInput && articlesGrid && noResultsMessage) {
        const allArticles = articlesGrid.querySelectorAll('.article-card');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let resultsFound = 0;
            allArticles.forEach(article => {
                const title = article.querySelector('.article-card__title').textContent.toLowerCase();
                const excerpt = article.querySelector('.article-card__excerpt').textContent.toLowerCase();
                if (title.includes(query) || excerpt.includes(query)) {
                    article.style.display = 'block';
                    resultsFound++;
                } else {
                    article.style.display = 'none';
                }
            });
            if (resultsFound > 0) {
                noResultsMessage.classList.remove('visible');
            } else {
                noResultsMessage.classList.add('visible');
            }
        });
    }
});  const currentPath = window.location.pathname.split("/").pop();
    
    // Select all navigation links from both desktop and mobile menus
    const navLinks = document.querySelectorAll('.header__nav a, .mobile-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();

        // First, remove any active class to reset the state
        link.classList.remove('nav__link--active');

        // Check for a match
        // Condition 1: The link's path is exactly the same as the current page's path.
        // Condition 2: If we are on the root page (currentPath is ""), highlight "index.html".
        if (linkPath === currentPath || (currentPath === '' && (linkPath === 'index.html' || linkPath === ''))) {
            link.classList.add('nav__link--active');
        }
    });