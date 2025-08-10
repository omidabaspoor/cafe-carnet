document.addEventListener('DOMContentLoaded', () => {

    // --- 1. کنترل منوی موبایل حرفه‌ای ---
       // --- کنترل نهایی منوی موبایل (مدل تلگرام) ---
  const navToggle = document.querySelector('.mobile-nav-toggle');
    const navOverlay = document.querySelector('.mobile-nav-drawer-overlay');
    const navCloseBtn = document.querySelector('.mobile-nav__close-btn');
    const bodyEl = document.body;

    function toggleMenu() {
        bodyEl.classList.toggle('nav-is-open');
    }

    if (navToggle && navOverlay && navCloseBtn) {
        navToggle.addEventListener('click', toggleMenu);
        navCloseBtn.addEventListener('click', toggleMenu);
        
        navOverlay.addEventListener('click', (e) => {
            if (e.target === navOverlay) {
                toggleMenu();
            }
        });
    }

    // --- ۲. هایلایت کردن لینک فعال در هر دو منو (دسکتاپ و موبایل) ---
    try {
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        const navLinks = document.querySelectorAll('.header__nav a, .mobile-nav a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split("/").pop() || 'index.html';
            
            // ابتدا تمام کلاس‌های فعال را حذف می‌کنیم تا تداخلی نباشد
            link.classList.remove('nav__link--active');
            
            // اگر لینک مربوط به صفحه فعلی بود، کلاس را اضافه می‌کنیم
            if (linkPath === currentPath) {
                link.classList.add('nav__link--active');
            }
        });
    } catch (e) {
        console.error("Error highlighting active link:", e);
    }

    // --- بقیه کدهای شما اینجا قرار می‌گیرند ---
    // ...

    // --- بقیه کدهای شما (آکاردئون، ویجت و ...) در اینجا قرار می‌گیرند ---
    // ...

    // --- بقیه کدهای جاوا اسکریپت شما ---
    // (کدهای آکاردئون، انیمیشن اسکرول و ... اینجا قرار می‌گیرند)



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

    // --- 8. SMART NAVIGATION: Active Link Highlighter ---
    const currentPath = window.location.pathname.split("/").pop(); // Gets the current file name, e.g., "services.html"
    const navLinks = document.querySelectorAll('.header__nav a, .mobile-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();

        // Check if the link path matches the current path.
        // Also handle the homepage case where the path might be empty.
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('nav__link--active');
        } else {
            link.classList.remove('nav__link--active');
        }
    });

}); // This is the closing bracket and parenthesis of your DOMContentLoaded