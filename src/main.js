// Main JS - Interactions

// Hero Slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    if (slides.length < 2) return;

    let currentSlide = 0;
    const interval = 4000; // 4 seconds per slide

    // Initialize first slide
    slides[0].classList.add('active');

    setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        
        // Prepare current to exit
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('exit');
        
        // Prepare next to enter
        slides[nextSlide].classList.remove('exit'); // Ensure it starts from right (default state)
        // Force reflow/browser repaint to ensure the 'exit' class removal is processed 
        // before adding 'active', otherwise it might jump.
        void slides[nextSlide].offsetWidth; 
        
        slides[nextSlide].classList.add('active');
        
        currentSlide = nextSlide;
    }, interval);
});
