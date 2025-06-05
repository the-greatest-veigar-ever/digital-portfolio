// Advanced animations and interactive effects

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    createParticleBackground();
    setupMouseFollower();
    setupCardTiltEffect();
    setupGlowEffects();
});

// Main animation initialization
function initializeAnimations() {
    setupRevealAnimations();
    setupStaggeredAnimations();
    setupScrollTriggeredAnimations();
    setupHoverEffects();
}

// Reveal animations on scroll
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.glass-card, .project-card, .achievement-card, .skill-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 100); // Stagger animation
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-ready');
        revealObserver.observe(el);
    });

    // Add CSS for reveal animation
    addRevealStyles();
}

// Add reveal animation styles
function addRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .reveal-ready {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .reveal {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        .stagger-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .stagger-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .card-tilt {
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
        }
        
        .glow-effect {
            position: relative;
            overflow: hidden;
        }
        
        .glow-effect::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: -1;
        }
        
        .glow-effect:hover::before {
            opacity: 1;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            50% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
        }
        
        .floating-element {
            animation: float 6s ease-in-out infinite;
        }
        
        .pulse-glow {
            animation: pulse-glow 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Staggered animations for grouped elements
function setupStaggeredAnimations() {
    const groups = [
        document.querySelectorAll('.skills-grid .skill-item'),
        document.querySelectorAll('.project-card'),
        document.querySelectorAll('.achievement-card')
    ];

    groups.forEach(group => {
        if (group.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(group).forEach((item, index) => {
                            item.classList.add('stagger-item');
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 150);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(group[0].parentElement);
        }
    });
}

// Scroll-triggered animations
function setupScrollTriggeredAnimations() {
    // Animate skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;

                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);

                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Counter animation for numbers
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(counter);
    });
}

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Enhanced hover effects
function setupHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.glass-card, .project-card, .achievement-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.glass-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

// Create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;

    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 3D card tilt effect
function setupCardTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .achievement-card');

    cards.forEach(card => {
        card.classList.add('card-tilt');

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Glow effects
function setupGlowEffects() {
    const glowElements = document.querySelectorAll('.glass-card, .glass-button');

    glowElements.forEach(element => {
        element.classList.add('glow-effect');
    });
}

// Mouse follower effect
function setupMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.2) 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        opacity: 0;
    `;

    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Change follower on hover
    const interactiveElements = document.querySelectorAll('a, button, .glass-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.background = 'rgba(16, 185, 129, 0.3)';
            follower.style.border = '2px solid rgba(16, 185, 129, 0.8)';
        });

        element.addEventListener('mouseleave', () => {
            follower.style.width = '20px';
            follower.style.height = '20px';
            follower.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.2) 70%)';
            follower.style.border = 'none';
        });
    });
}

// Particle background effect
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.6;
    `;

    document.body.appendChild(canvas);

    let particles = [];
    let mouse = { x: 0, y: 0 };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                this.vx -= Math.cos(angle) * 0.01;
                this.vy -= Math.sin(angle) * 0.01;
            }

            // Apply friction
            this.vx *= 0.99;
            this.vy *= 0.99;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - distance / 80)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--jade-primary), var(--jade-light));
        z-index: 10000;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Intersection Observer for lazy loading and animations
function setupIntersectionObservers() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                    img.style.opacity = '1';
                };
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// Initialize intersection observers
setupIntersectionObservers();

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on low-end devices
    const isLowEnd = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;

    if (isLowEnd) {
        document.body.classList.add('low-end-device');

        // Add styles for low-end devices
        const style = document.createElement('style');
        style.textContent = `
            .low-end-device * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
            
            .low-end-device .particle-background {
                display: none;
            }
            
            .low-end-device .mouse-follower {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizeAnimations();