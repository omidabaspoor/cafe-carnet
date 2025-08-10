document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Functionality ---
    const accordionItems = document.querySelectorAll('.accordion__item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        header.addEventListener('click', () => {
            // Close other open items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('is-open');
                    otherItem.querySelector('.accordion__content').style.maxHeight = '0px';
                }
            });

            // Toggle the clicked item
            item.classList.toggle('is-open');
            const content = item.querySelector('.accordion__content');
            if (item.classList.contains('is-open')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
        });
    });

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

    // --- Review Form Functionality ---
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reviewerName').value;
            const comment = document.getElementById('reviewComment').value;
            const ratingInput = document.querySelector('input[name="rating"]:checked');
            
            if (!name.trim() || !comment.trim() || !ratingInput) {
                alert('لطفاً نام، امتیاز و متن دیدگاه را تکمیل کنید.');
                return;
            }
            
            const ratingValue = parseInt(ratingInput.value);
            
            // Create the new review card
            const newReviewCard = document.createElement('article');
            newReviewCard.className = 'review-card';
            
            // Generate stars HTML
            let starsHTML = '';
            for (let i = 0; i < 5; i++) {
                starsHTML += `<i class="${i < ratingValue ? 'ph-fill' : 'ph-bold'} ph-star"></i>`;
            }
            
            newReviewCard.innerHTML = `
                <header class="review-card__header">
                    <span class="review-card__name">${name}</span>
                    <div class="review-card__stars">${starsHTML}</div>
                </header>
                <div class="review-card__body"><p>${comment}</p></div>
            `;

            if (reviewsList) {
                reviewsList.prepend(newReviewCard);
            }
            reviewForm.reset();
        });
    }
});