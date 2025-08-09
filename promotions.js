// این فایل فقط برای فعال‌سازی انیمیشن‌ها در این صفحه است
document.addEventListener('DOMContentLoaded', () => {
    // Animate on load functionality
    document.querySelectorAll('.animate-on-load').forEach(el => {
        el.classList.add('is-visible');
    });
    
    // Scroll Animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => observer.observe(el));
});