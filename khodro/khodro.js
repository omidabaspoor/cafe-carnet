document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Functionality ---
    const accordionItems = document.querySelectorAll('.accordion__item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        header.addEventListener('click', () => {
            const content = item.querySelector('.accordion__content');
            item.classList.toggle('is-open');
            if (item.classList.contains('is-open')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
        });
    });

    // --- Scroll Animation Functionality ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-load');
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
            const email = document.getElementById('reviewerEmail').value;
            const comment = document.getElementById('reviewComment').value;
            const ratingInput = document.querySelector('input[name="rating"]:checked');
            
            if (!name.trim() || !email.trim() || !comment.trim() || !ratingInput) {
                alert('لطفاً نام، ایمیل، امتیاز و متن دیدگاه را تکمیل کنید.');
                return;
            }
            
            const ratingValue = parseInt(ratingInput.value);
            const newReviewCard = document.createElement('article');
            newReviewCard.className = 'review-card';
            let starsHTML = '';
            for (let i = 0; i < 5; i++) {
                if (i < ratingValue) {
                    starsHTML += '<i class="ph-fill ph-star"></i>';
                } else {
                    starsHTML += '<i class="ph-bold ph-star"></i>';
                }
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
            alert('دیدگاه شما با موفقیت ثبت شد!');
        });
    }

    // --- Copy Phone Number Functionality ---
    const copyPhoneBtn = document.getElementById('copyPhoneBtn');
    if (copyPhoneBtn) {
        const originalText = copyPhoneBtn.textContent;
        const phoneNumber = copyPhoneBtn.dataset.phoneNumber;
        copyPhoneBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                copyPhoneBtn.textContent = 'کپی شد!';
                copyPhoneBtn.classList.add('success');
                setTimeout(() => {
                    copyPhoneBtn.textContent = originalText;
                    copyPhoneBtn.classList.remove('success');
                }, 2000);
            }).catch(err => {
                console.error('خطا در کپی کردن شماره: ', err);
                alert('امکان کپی خودکار وجود ندارد. لطفاً شماره را دستی کپی کنید.');
            });
        });
    }
});