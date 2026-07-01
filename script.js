// ========== TYPED.JS INITIALIZATION ==========
if (document.querySelector(".text")) {
    var typed = new Typed(".text", {
        strings: ["Policy Formulation", "Policy Consulting", "Data Analysis"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

// ========== IMMERSIVE NAVBAR FUNCTIONALITY ==========
const header = document.querySelector('.header');
const mobileToggle = document.getElementById('mobile-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navbar.classList.toggle('active');
    
    // Animate toggle
    anime({
        targets: mobileToggle,
        rotate: mobileToggle.classList.contains('active') ? 90 : 0,
        duration: 300,
        easing: 'easeInOutQuad'
    });
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileToggle?.classList.remove('active');
            navbar.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target) && !mobileToggle?.contains(e.target)) {
            mobileToggle?.classList.remove('active');
            navbar.classList.remove('active');
        }
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav indicator animation
const updateNavIndicator = () => {
    const activeLink = document.querySelector('.nav-link.active');
    const indicator = document.querySelector('.nav-indicator');
    
    if (activeLink && indicator && window.innerWidth > 768) {
        const linkRect = activeLink.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${linkRect.left - navbarRect.left}px`;
        indicator.style.opacity = '1';
    }
};

// Update indicator on load and resize
window.addEventListener('load', updateNavIndicator);
window.addEventListener('resize', updateNavIndicator);

// Animate logo on hover
const logoContainer = document.querySelector('.logo-container');
if (logoContainer) {
    logoContainer.addEventListener('mouseenter', () => {
        anime({
            targets: '.logo-icon i',
            rotate: 360,
            scale: [1, 1.2, 1],
            duration: 600,
            easing: 'easeInOutQuad'
        });
    });
}

// Nav link hover effects
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        anime({
            targets: this.querySelector('i'),
            translateY: [-2, 0],
            scale: [1, 1.2, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .6)'
        });
    });
});

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle?.querySelector('i');

// Set dark mode as default theme
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply theme on page load
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.classList.replace('bx-sun', 'bx-moon');
} else {
    body.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.classList.replace('bx-moon', 'bx-sun');
}

themeToggle?.addEventListener('click', () => {
    const currentMode = body.getAttribute('data-theme');
    
    if (currentMode === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon?.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon?.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'dark');
    }
    
    // Animate theme toggle icon
    anime({
        targets: themeIcon,
        rotate: 360,
        duration: 500,
        easing: 'easeOutExpo'
    });
});

// ========== HERO STATS COUNTER ==========
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Trigger counter animation when hero is visible
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((num, index) => {
                setTimeout(() => {
                    animateCounter(num);
                }, index * 200);
            });
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroStatsObserver.observe(heroStats);
}

// ========== PARALLAX SCROLLING ==========
let parallaxElements = document.querySelectorAll('.parallax-image');

window.addEventListener('scroll', () => {
    let scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        let speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax background
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========== SCROLL TO TOP BUTTON ==========
const toTop = document.querySelector(".top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop?.classList.add("active");
    } else {
        toTop?.classList.remove("active");
    }
});

// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Anime.js animation for elements
            anime({
                targets: entry.target,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo',
                delay: entry.target.dataset.delay || 0
            });
        }
    });
}, observerOptions);

// Observe all anime elements
document.querySelectorAll('.anime-element').forEach((element, index) => {
    element.dataset.delay = index * 100;
    observer.observe(element);
});

// ========== ANIME.JS ANIMATIONS ==========
// Animate feature cards on hover
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: this.querySelector('i'),
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            duration: 600,
            easing: 'easeInOutQuad'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Animate skill bars when visible
document.querySelectorAll('.skill-item').forEach((item, index) => {
    observer.observe(item);
    
    item.addEventListener('animationstart', () => {
        const progressLine = item.querySelector('.progress-line span');
        if (progressLine) {
            anime({
                targets: progressLine,
                width: progressLine.style.width || '70%',
                duration: 1500,
                easing: 'easeInOutQuad',
                delay: index * 100
            });
        }
    });
});

// Animate radial progress circles
document.querySelectorAll('.skill-circle').forEach((circle, index) => {
    observer.observe(circle);
});

// Animate project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            translateY: -10,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            translateY: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Animate expertise cards
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            translateY: -10,
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: this.querySelector('.expertise-icon'),
            rotateY: 360,
            duration: 600,
            easing: 'easeInOutQuad'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            translateY: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== CONTACT FORM ANIMATION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('.btn-submit');
        const originalText = button.innerHTML;
        
        // Animate button
        anime({
            targets: button,
            scale: [1, 0.9, 1],
            duration: 300,
            easing: 'easeInOutQuad',
            complete: () => {
                button.innerHTML = '<i class="bx bx-check"></i> <span>Message Sent!</span>';
                
                anime({
                    targets: button,
                    backgroundColor: ['#667eea', '#43e97b'],
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    this.reset();
                }, 3000);
            }
        });
    });
}

// ========== NAVBAR ACTIVE STATE ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ========== PAGE TRANSITION ANIMATION ==========
window.addEventListener('load', () => {
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad'
    });
});

// ========== CURSOR TRAIL EFFECT (Optional) ==========
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ========== SCROLL PROGRESS INDICATOR ==========
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ========== DYNAMIC TEXT ANIMATION ==========
const animateText = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        anime({
            targets: element,
            innerHTML: [0, text],
            duration: 1000,
            delay: index * 200,
            easing: 'linear',
            round: 1
        });
    });
};

// Animate page titles
setTimeout(() => {
    animateText('.page-title');
}, 300);

// ========== AUTO-UPDATE COPYRIGHT YEAR ==========
const updateCopyrightYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};

// Call on page load
updateCopyrightYear();

// ========== FOOTER ANIMATIONS ==========
const animateFooterOnScroll = () => {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate footer content
                anime({
                    targets: '.footer-about, .footer-links, .footer-expertise, .footer-contact',
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: anime.stagger(100),
                    easing: 'easeOutQuad'
                });

                // Animate footer stats
                anime({
                    targets: '.stat-item',
                    translateX: [-20, 0],
                    opacity: [0, 1],
                    duration: 600,
                    delay: anime.stagger(80, {start: 400}),
                    easing: 'easeOutQuad'
                });

                // Animate social icons
                anime({
                    targets: '.footer-social a',
                    scale: [0, 1],
                    opacity: [0, 1],
                    duration: 500,
                    delay: anime.stagger(50, {start: 600}),
                    easing: 'easeOutElastic(1, .5)'
                });

                // Animate tech badges
                anime({
                    targets: '.tech-badge',
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 400,
                    delay: anime.stagger(50, {start: 800}),
                    easing: 'easeOutQuad'
                });

                // Animate floating symbols
                anime({
                    targets: '.float-symbol',
                    opacity: [0, 0.08],
                    duration: 1500,
                    delay: anime.stagger(50),
                    easing: 'easeInOutQuad'
                });

                footerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    footerObserver.observe(footer);
};

// Initialize footer animations
animateFooterOnScroll();

// ========== HORIZONTAL PARALLAX EXPERTISE SHOWCASE ==========

// Horizontal parallax scroll effect for expertise cards
const initExpertiseParallax = () => {
    const expertiseSection = document.querySelector('.expertise-showcase');
    if (!expertiseSection) return;

    const cards = document.querySelectorAll('.expertise-card');
    const progressFill = document.querySelector('.progress-fill');
    const progressDots = document.querySelectorAll('.dot');
    const animatedFills = document.querySelectorAll('.animated-fill');
    
    // Smooth parallax on scroll
    let ticking = false;
    
    const updateParallax = () => {
        const sectionTop = expertiseSection.offsetTop;
        const sectionHeight = expertiseSection.offsetHeight;
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Calculate header scroll progress (when header comes into view)
        const headerElement = document.querySelector('.expertise-header');
        if (headerElement && animatedFills.length > 0) {
            const headerTop = headerElement.getBoundingClientRect().top;
            const headerHeight = headerElement.offsetHeight;
            
            // Progress from 0 (header starts entering) to 1 (header is fully visible)
            // Trigger earlier - start when header is 80% down the viewport
            let headerProgress = 0;
            const triggerPoint = windowHeight * 0.8; // Start at 80% of viewport height
            
            if (headerTop < triggerPoint) {
                // Calculate progress based on how far the header has moved from trigger point
                const distanceFromTrigger = triggerPoint - headerTop;
                const animationDistance = headerHeight + 200; // Animation completes over this distance
                headerProgress = Math.max(0, Math.min(1, distanceFromTrigger / animationDistance));
            }
            
            // Apply fill progress to animated text (bi-directional)
            const fillPercent = headerProgress * 100;
            animatedFills.forEach(fill => {
                fill.style.backgroundSize = `${fillPercent}% 100%`;
                fill.style.setProperty('--underline-width', `${fillPercent}%`);
            });
        }
        
        // Check if section is in viewport
        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            // Progress from 0 (section starts entering viewport) to 1 (section exits viewport)
            const sectionProgress = (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight);
            
            // Z-axis depth parallax effect: cards come from behind and move forward
            cards.forEach(card => {
                const speed = parseFloat(card.dataset.parallaxSpeed || 1);
                
                // Calculate z-position: starts at -500px (far back), ends at 0px (front)
                // Higher speed cards start further back
                const maxDepth = -500 * speed;
                const zPosition = maxDepth + (sectionProgress * Math.abs(maxDepth));
                
                // Calculate scale: starts small (0.5), grows to full size (1.0)
                const minScale = 0.5;
                const scale = minScale + (sectionProgress * (1 - minScale));
                
                // Calculate opacity: fades in as it comes forward
                const minOpacity = 0.3;
                const opacity = minOpacity + (sectionProgress * (1 - minOpacity));
                
                // Apply 3D transformation
                card.style.transform = `translateZ(${zPosition}px) scale(${scale})`;
                card.style.opacity = opacity;
            });
            
            // Update progress bar (bi-directional)
            if (progressFill) {
                const clampedProgress = Math.max(0, Math.min(1, sectionProgress)) * 100;
                progressFill.style.width = `${clampedProgress}%`;
            }
            
            // Update active dot based on scroll position (bi-directional)
            if (progressDots.length > 0) {
                const activeIndex = Math.min(
                    progressDots.length - 1,
                    Math.max(0, Math.floor(sectionProgress * progressDots.length))
                );
                progressDots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        ticking = false;
    };
    
    const requestParallaxUpdate = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    
    // Listen to scroll events
    window.addEventListener('scroll', requestParallaxUpdate);
    
    // Initial update
    updateParallax();
    
    // Dot click navigation
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetProgress = index / (progressDots.length - 1);
            const targetScroll = expertiseSection.offsetTop + (targetProgress * expertiseSection.offsetHeight);
            
            window.scrollTo({
                top: targetScroll - (window.innerHeight / 2),
                behavior: 'smooth'
            });
        });
    });
    
    // Card hover 3D tilt effect
    cards.forEach(card => {
        let currentZPos = 0;
        let currentScale = 1;
        
        card.addEventListener('mouseenter', (e) => {
            // Store current z-position and scale before hover
            const transform = card.style.transform;
            const zMatch = transform.match(/translateZ\(([-\d.]+)px\)/);
            const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
            if (zMatch) currentZPos = parseFloat(zMatch[1]);
            if (scaleMatch) currentScale = parseFloat(scaleMatch[1]);
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Maintain z-position and scale during hover tilt
            card.style.transform = `translateZ(${currentZPos}px) scale(${currentScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Return to scroll-based z-position
            const speed = parseFloat(card.dataset.parallaxSpeed || 1);
            const scrolled = window.pageYOffset;
            const sectionTop = expertiseSection.offsetTop;
            const sectionHeight = expertiseSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const sectionProgress = (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight);
            
            const maxDepth = -500 * speed;
            const zPosition = maxDepth + (sectionProgress * Math.abs(maxDepth));
            const minScale = 0.5;
            const scale = minScale + (sectionProgress * (1 - minScale));
            
            card.style.transform = `translateZ(${zPosition}px) scale(${scale})`;
        });
    });
    
    // Set initial state for cards (far back in z-space)
    cards.forEach((card, index) => {
        const speed = parseFloat(card.dataset.parallaxSpeed || 1);
        const maxDepth = -500 * speed;
        card.style.transform = `translateZ(${maxDepth}px) scale(0.5)`;
        card.style.opacity = '0.3';
    });
};

// Initialize expertise parallax when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExpertiseParallax);
} else {
    initExpertiseParallax();
}

// ========== FOOTER INTERACTIVE EFFECTS ==========
// Add hover animation to footer links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        anime({
            targets: this.querySelector('i'),
            translateX: [0, 5],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    link.addEventListener('mouseleave', function() {
        anime({
            targets: this.querySelector('i'),
            translateX: [5, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Interactive floating symbols
document.querySelectorAll('.float-symbol').forEach(symbol => {
    // Click animation - burst effect
    symbol.addEventListener('click', function() {
        const symbolText = this.textContent;
        
        anime({
            targets: this,
            scale: [1, 2.5, 1],
            rotate: [0, 720],
            duration: 800,
            easing: 'easeOutElastic(1, .6)'
        });

        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'symbol-ripple';
        ripple.textContent = symbolText;
        ripple.style.position = 'absolute';
        ripple.style.left = this.style.left;
        ripple.style.top = this.style.top;
        ripple.style.fontSize = '2rem';
        ripple.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '5';
        
        this.parentElement.appendChild(ripple);
        
        anime({
            targets: ripple,
            scale: [1, 3],
            opacity: [0.8, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            complete: () => ripple.remove()
        });
    });

    // Hover animation - pause and glow
    symbol.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.8,
            rotate: '360deg',
            duration: 400,
            easing: 'easeOutQuad'
        });
    });

    symbol.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            rotate: '0deg',
            duration: 400,
            easing: 'easeOutQuad'
        });
    });

    // Random burst animation every 10-20 seconds
    const randomInterval = Math.random() * 10000 + 10000;
    setInterval(() => {
        anime({
            targets: symbol,
            scale: [1, 1.5, 1],
            opacity: [0.08, 0.3, 0.08],
            duration: 600,
            easing: 'easeInOutQuad'
        });
    }, randomInterval);
});

// Animate footer divider on hover
const footerDivider = document.querySelector('.footer-divider');
if (footerDivider) {
    footerDivider.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scaleX: [1, 1.02],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    footerDivider.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scaleX: [1.02, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
}

// Add particle effect when hovering over footer stats
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: [1, 1.05],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    stat.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: [1.05, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// ========== ABOUT PAGE TIMELINE SCRIBBLE ANIMATIONS ==========

// Generate hand-drawn scribble SVG for each timeline item
const generateScribbleSVG = () => {
    const categoryTitles = document.querySelectorAll('.category-title');
    if (categoryTitles.length === 0) return;

    // Generate after DOM is fully loaded
    setTimeout(() => {
        categoryTitles.forEach(title => {
            const scribbleDiv = title.querySelector('.scribble-circle');
            if (!scribbleDiv) return;

            // Clear any existing SVG
            scribbleDiv.innerHTML = '';

            // Create a temporary span to measure JUST the text (not the icon)
            const textSpan = document.createElement('span');
            textSpan.style.visibility = 'hidden';
            textSpan.style.position = 'absolute';
            textSpan.style.whiteSpace = 'nowrap';
            textSpan.style.fontSize = window.getComputedStyle(title).fontSize;
            textSpan.style.fontFamily = window.getComputedStyle(title).fontFamily;
            textSpan.style.fontWeight = window.getComputedStyle(title).fontWeight;
            
            // Get just the text content (excluding icon)
            const icon = title.querySelector('i');
            const textContent = Array.from(title.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'I' && !node.classList.contains('scribble-circle')))
                .map(node => node.textContent)
                .join('')
                .trim();
            
            textSpan.textContent = textContent;
            document.body.appendChild(textSpan);
            
            // Measure the text width
            const textWidth = textSpan.offsetWidth;
            document.body.removeChild(textSpan);
            
            // Add icon width
            const iconWidth = icon ? icon.offsetWidth + 15 : 0; // 15px is the gap
            const totalWidth = textWidth + iconWidth;
            
            // Calculate SVG dimensions with padding
            const svgWidth = totalWidth + 20; // Minimal padding
            const svgHeight = 25; // Height for underline
            
            // Create SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
            svg.setAttribute('width', svgWidth);
            svg.setAttribute('height', svgHeight);
            svg.style.position = 'absolute';
            svg.style.left = '0';
            svg.style.top = '0';
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            // Create SKETCHY HAND-DRAWN UNDERLINE (like natural underlining)
            const startX = 10;
            const endX = svgWidth - 10;
            const y = 12; // Middle of SVG height
            
            // Add wobble for sketchy hand-drawn effect
            const w = () => (Math.random() - 0.5) * 3;
            
            // Build wobbly underline path (2-3 overlapping lines for sketchy effect)
            let underlinePath = '';
            
            // First underline stroke
            underlinePath += `M ${startX + w()},${y + w()} `;
            
            // Create segments along the line with wobble
            const segments = Math.max(8, Math.floor(totalWidth / 60)); // More segments for longer text
            const segmentWidth = (endX - startX) / segments;
            
            for (let i = 1; i <= segments; i++) {
                const x = startX + (segmentWidth * i);
                const yOffset = w();
                
                if (i % 2 === 0) {
                    // Use quadratic curve for smooth wobble
                    const cpX = x - segmentWidth / 2 + w();
                    const cpY = y + w();
                    underlinePath += `Q ${cpX},${cpY} ${x + w()},${y + yOffset} `;
                } else {
                    underlinePath += `L ${x + w()},${y + yOffset} `;
                }
            }
            
            // Second underline stroke (slightly offset for sketchy double-line effect)
            underlinePath += `M ${startX + w() + 2},${y + w() + 2} `;
            for (let i = 1; i <= segments; i++) {
                const x = startX + (segmentWidth * i);
                const yOffset = w();
                underlinePath += `L ${x + w() + 2},${y + yOffset + 2} `;
            }
            
            // Optional third stroke for more sketchy effect
            underlinePath += `M ${startX + w() - 1},${y + w() + 1} `;
            for (let i = 1; i <= segments / 2; i++) {
                const x = startX + (segmentWidth * i * 2);
                underlinePath += `L ${x + w() - 1},${y + w() + 1} `;
            }
            
            path.setAttribute('d', underlinePath);
            path.setAttribute('class', 'scribble-path');
            
            svg.appendChild(path);
            scribbleDiv.appendChild(svg);
            
            // Calculate path length after DOM insertion
            setTimeout(() => {
                const pathLength = path.getTotalLength ? path.getTotalLength() : 2000;
                path.style.strokeDasharray = pathLength;
                path.style.strokeDashoffset = pathLength;
                
                // Set CSS variable for animation
                path.style.setProperty('--path-length', pathLength);
                
                scribbleDiv.dataset.pathLength = pathLength;
            }, 10);
            
            // Debug log to verify DIFFERENT widths
            console.log(`"${textContent}": text=${textWidth}px + icon=${iconWidth}px = total=${totalWidth}px → underline=${svgWidth}px (${segments} segments)`);
        });
    }, 100);
};

// Timeline scroll-based scribble animation
const initTimelineScribbles = () => {
    const categoryTitles = document.querySelectorAll('.category-title');
    if (categoryTitles.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -20% 0px'
    };

    const scribbleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add scribble when scrolling down into view
                entry.target.classList.add('scribbled');
                entry.target.classList.remove('unscribbled');
            } else if (entry.boundingClientRect.top > 0) {
                // Remove scribble when scrolling back up
                entry.target.classList.remove('scribbled');
                entry.target.classList.add('unscribbled');
                
                // After animation completes, remove the class
                setTimeout(() => {
                    if (!entry.target.classList.contains('scribbled')) {
                        entry.target.classList.remove('unscribbled');
                    }
                }, 1000);
            }
        });
    }, observerOptions);

    categoryTitles.forEach(title => {
        scribbleObserver.observe(title);
    });
};

// Sidebar navigation active state
const initSidebarNavigation = () => {
    const sidebar = document.getElementById('timeline-sidebar');
    if (!sidebar) return;

    const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
    const categories = document.querySelectorAll('.timeline-category');

    // Intersection Observer for active section highlighting
    const observerOptions = {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
        rootMargin: '-15% 0px -65% 0px'
    };

    let currentActiveSection = null;

    const navObserver = new IntersectionObserver((entries) => {
        // Find the most visible section
        let mostVisibleEntry = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisibleEntry = entry;
            }
        });

        // Update active state if we have a visible section
        if (mostVisibleEntry && mostVisibleEntry.intersectionRatio > 0.1) {
            const sectionId = mostVisibleEntry.target.id;
            
            if (sectionId && sectionId !== currentActiveSection) {
                currentActiveSection = sectionId;
                
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === sectionId) {
                        link.classList.add('active');
                        console.log(`Sidebar activated: ${sectionId}`);
                    }
                });
            }
        }
    }, observerOptions);

    categories.forEach(category => {
        navObserver.observe(category);
    });

    // Smooth scroll on click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Constrain sidebar within timeline section (stop at footer)
    const constrainSidebar = () => {
        const sidebar = document.getElementById('timeline-sidebar');
        const timelineSection = document.querySelector('.timeline-section');
        const footer = document.querySelector('.footer');
        
        if (!sidebar || !timelineSection || !footer) return;
        
        const timelineRect = timelineSection.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const sidebarHeight = sidebar.offsetHeight;
        
        // Check if sidebar would overlap with footer
        if (footerRect.top < window.innerHeight - 20) {
            // Footer is visible, stop sidebar before it
            const maxBottom = footerRect.top - 20;
            const currentBottom = sidebar.getBoundingClientRect().bottom;
            
            if (currentBottom > maxBottom) {
                sidebar.style.position = 'absolute';
                sidebar.style.bottom = '20px';
                sidebar.style.top = 'auto';
            }
        } else {
            // Footer not visible, use sticky positioning
            sidebar.style.position = 'sticky';
            sidebar.style.top = '120px';
            sidebar.style.bottom = 'auto';
        }
    };
    
    window.addEventListener('scroll', constrainSidebar, { passive: true });
    constrainSidebar();
};

// Floating background words and Greek symbols
const initFloatingBackgroundElements = () => {
    // Using pure CSS animations now - no JavaScript needed
    // Elements will continuously loop from left to right
};

// Timeline fill animation based on scroll
const initTimelineFillAnimation = () => {
    const timelines = document.querySelectorAll('.timeline');
    if (timelines.length === 0) return;

    const updateTimelineFill = () => {
        timelines.forEach(timeline => {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timelineRect.top;
            const timelineHeight = timelineRect.height;
            const windowHeight = window.innerHeight;

            // Calculate progress: 0% when timeline enters viewport, 100% when it exits
            let progress = 0;
            
            if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
                // Timeline is in viewport
                const scrolled = windowHeight - timelineTop;
                const total = timelineHeight + windowHeight;
                progress = Math.min(100, Math.max(0, (scrolled / total) * 100));
            } else if (timelineTop + timelineHeight <= 0) {
                // Timeline is fully scrolled past
                progress = 100;
            }

            timeline.style.setProperty('--timeline-fill', `${progress}%`);
        });
    };

    // Update on scroll
    window.addEventListener('scroll', updateTimelineFill, { passive: true });
    
    // Initial calculation
    updateTimelineFill();
};

// Floating concepts animation on about page
const initFloatingConcepts = () => {
    const concepts = document.querySelectorAll('.concept-badge');
    if (concepts.length === 0) return;

    concepts.forEach((concept, index) => {
        const speed = concept.dataset.speed || 1;
        
        anime({
            targets: concept,
            translateY: [
                { value: -20 * speed, duration: 2000 * speed },
                { value: 0, duration: 2000 * speed }
            ],
            scale: [
                { value: 1, duration: 2000 * speed },
                { value: 1.05, duration: 1000 * speed },
                { value: 1, duration: 1000 * speed }
            ],
            opacity: [
                { value: 0.8, duration: 2000 * speed },
                { value: 1, duration: 1000 * speed },
                { value: 0.8, duration: 1000 * speed }
            ],
            loop: true,
            easing: 'easeInOutSine',
            delay: index * 500
        });
    });
};

// Floating Greek symbols animation on about page
const initFloatingGreek = () => {
    const greekSymbols = document.querySelectorAll('.floating-greek .greek-symbol');
    if (greekSymbols.length === 0) return;

    greekSymbols.forEach((symbol, index) => {
        anime({
            targets: symbol,
            translateX: [
                { value: anime.random(-15, 15), duration: 3000 },
                { value: anime.random(-15, 15), duration: 3000 }
            ],
            translateY: [
                { value: anime.random(-20, 20), duration: 3000 },
                { value: anime.random(-20, 20), duration: 3000 }
            ],
            rotate: [
                { value: anime.random(-10, 10), duration: 3000 },
                { value: anime.random(-10, 10), duration: 3000 }
            ],
            opacity: [
                { value: 0.1, duration: 2000 },
                { value: 0.2, duration: 2000 },
                { value: 0.1, duration: 2000 }
            ],
            loop: true,
            easing: 'easeInOutQuad',
            delay: index * 600
        });
    });
};

// Initialize about page animations
if (document.querySelector('.timeline-section')) {
    generateScribbleSVG();
    initTimelineScribbles();
    initSidebarNavigation();
    initFloatingBackgroundElements();
    initTimelineFillAnimation();
    initFloatingConcepts();
    initFloatingGreek();
}

console.log('🚀 Portfolio website loaded successfully with all animations!');
console.log('📊 Interactive footer with math/econ symbols initialized!');