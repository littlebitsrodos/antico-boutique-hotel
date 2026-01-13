/* ==========================================================================
   Main JavaScript for Palazzo Antico
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // --------------------------------------------------------------------------
    // Navigation Scroll Effect
    // --------------------------------------------------------------------------
    const nav = document.querySelector('.nav');

    function handleScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // --------------------------------------------------------------------------
    // Mobile Navigation
    // --------------------------------------------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // --------------------------------------------------------------------------
    // Smooth Scroll for Anchor Links
    // --------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------------------------------------------------------------------------
    // Scroll Reveal Animation
    // --------------------------------------------------------------------------
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --------------------------------------------------------------------------
    // Parallax Effect for Hero
    // --------------------------------------------------------------------------
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg img');

    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        });
    }

    // --------------------------------------------------------------------------
    // Image Lazy Loading
    // --------------------------------------------------------------------------
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // --------------------------------------------------------------------------
    // Floating Book Button Hide on Footer
    // --------------------------------------------------------------------------
    const floatingBtn = document.querySelector('.book-btn-floating');
    const footer = document.querySelector('.footer');

    if (floatingBtn && footer) {
        window.addEventListener('scroll', () => {
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (footerTop < windowHeight) {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.pointerEvents = 'none';
            } else {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.pointerEvents = 'auto';
            }
        });
    }

    // --------------------------------------------------------------------------
    // Form Validation (for Contact page)
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const name = this.querySelector('[name="name"]');
            const email = this.querySelector('[name="email"]');
            const message = this.querySelector('[name="message"]');

            let isValid = true;

            if (name && name.value.trim() === '') {
                isValid = false;
                name.style.borderColor = 'var(--terracotta)';
            }

            if (email && !isValidEmail(email.value)) {
                isValid = false;
                email.style.borderColor = 'var(--terracotta)';
            }

            if (message && message.value.trim() === '') {
                isValid = false;
                message.style.borderColor = 'var(--terracotta)';
            }

            if (isValid) {
                // Form is valid - show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // --------------------------------------------------------------------------
    // Interactive Spotlight Cursor
    // --------------------------------------------------------------------------
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    document.body.appendChild(spotlight);

    let mouseX = 0, mouseY = 0;
    let spotlightX = 0, spotlightY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateSpotlight() {
        // Smooth following effect
        spotlightX += (mouseX - spotlightX) * 0.1;
        spotlightY += (mouseY - spotlightY) * 0.1;

        spotlight.style.left = spotlightX + 'px';
        spotlight.style.top = spotlightY + 'px';

        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();

    // --------------------------------------------------------------------------
    // Hero Image Slider
    // --------------------------------------------------------------------------
    const heroSlider = document.querySelector('.hero-slider');

    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.hero-slider-indicator');
        let currentSlide = 0;
        const slideInterval = 6000; // 6 seconds per slide

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (indicators[i]) indicators[i].classList.remove('active');
            });

            slides[index].classList.add('active');
            if (indicators[index]) indicators[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        // Auto-advance slides
        let slideTimer = setInterval(nextSlide, slideInterval);

        // Click on indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(slideTimer);
                showSlide(index);
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        });

        // Pause on hover
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });

        heroSlider.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    }

    // --------------------------------------------------------------------------
    // Enhanced Slide-up Animation Observer
    // --------------------------------------------------------------------------
    const slideUpElements = document.querySelectorAll('.slide-up');

    const slideUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                slideUpObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    slideUpElements.forEach(element => {
        slideUpObserver.observe(element);
    });

    // --------------------------------------------------------------------------
    // Instagram Grid Lightbox (optional enhancement)
    // --------------------------------------------------------------------------
    const instagramItems = document.querySelectorAll('.instagram-item');

    instagramItems.forEach(item => {
        item.addEventListener('click', () => {
            // Could add lightbox functionality here
            // For now, just a subtle scale animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });

    // --------------------------------------------------------------------------
    // Premium Lightbox Controller
    // --------------------------------------------------------------------------
    const galleryImages = document.querySelectorAll('.room-gallery img, .gallery-grid img, .gallery-item img');

    if (galleryImages.length > 0) {
        // Create Lightbox DOM
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <button class="lightbox-btn lightbox-close" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <button class="lightbox-btn lightbox-prev" aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button class="lightbox-btn lightbox-next" aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
            <div class="lightbox-container">
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Elements
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        let currentIndex = 0;
        // Convert NodeList to Array for easier index handling and strictly filter for the current visible gallery
        // Simplification: We treat all images on the page as one sequence or group them by container?
        // For a simple premium feel, treating images within the same section/container as a group is best.
        let currentGroup = [];

        function openLightbox(index, group) {
            currentGroup = group;
            currentIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightboxImage() {
            const img = currentGroup[currentIndex];
            lightboxImg.src = img.src; // Uses the same src (already optimized webp)
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.alt;
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
            updateLightboxImage();
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % currentGroup.length;
            updateLightboxImage();
        }

        // Attach Click Events to Images
        // We group images based on their parent container to avoid jumping between unrelated galleries
        const galleryContainers = document.querySelectorAll('.room-gallery, .gallery-grid, .instagram-grid, .services-grid');

        galleryContainers.forEach(container => {
            const images = Array.from(container.querySelectorAll('img'));
            images.forEach((img, index) => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent other interactions
                    openLightbox(index, images);
                });
            });
        });

        // Event Listeners for Controls
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
        lightboxImg.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
                closeLightbox();
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });
    }

});
