document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';

                // Clone nav links
                const navLinksClone = navLinks.cloneNode(true);

                // Clone nav buttons
                const navButtonsClone = navButtons.cloneNode(true);

                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(navButtonsClone);

                // Add close button
                const closeBtn = document.createElement('button');
                closeBtn.className = 'mobile-menu-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenu.prepend(closeBtn);

                document.body.appendChild(mobileMenu);

                // Add event listener to close button
                closeBtn.addEventListener('click', function () {
                    mobileMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');

                    // Remove menu after animation
                    setTimeout(() => {
                        document.body.removeChild(mobileMenu);
                    }, 300);
                });

                // Handle dropdown clicks in mobile menu
                const dropdowns = mobileMenu.querySelectorAll('.dropdown');
                dropdowns.forEach(dropdown => {
                    const dropdownLink = dropdown.querySelector('.nav-item');
                    const dropdownContent = dropdown.querySelector('.dropdown-content');

                    dropdownLink.addEventListener('click', function (e) {
                        e.preventDefault();
                        dropdownContent.classList.toggle('show');
                    });
                });

                // Add active class after a small delay to trigger animation
                setTimeout(() => {
                    mobileMenu.classList.add('active');
                    document.body.classList.add('menu-open');
                }, 10);
            } else {
                // Toggle existing mobile menu
                const mobileMenu = document.querySelector('.mobile-menu');
                mobileMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            }
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 1000;
            padding: 20px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .mobile-menu-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        
        .mobile-menu .nav-links {
            display: flex;
            flex-direction: column;
            margin: 60px 0 30px;
        }
        
        .mobile-menu .nav-item {
            margin: 10px 0;
            font-size: 18px;
        }
        
        .mobile-menu .dropdown-content {
            position: static;
            display: none;
            box-shadow: none;
            padding: 0;
            margin: 10px 0 10px 20px;
        }
        
        .mobile-menu .dropdown-content.show {
            display: block;
        }
        
        .mobile-menu .nav-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .mobile-menu .btn {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Add placeholder images if real images aren't available
    const placeholderImages = [
        { selector: '.showcase-item.farmer img', url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVyJTIwY3JvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60' },
        { selector: '.showcase-item.hand img', url: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybWVyJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60' }
    ];

    placeholderImages.forEach(item => {
        const imgElement = document.querySelector(item.selector);
        if (imgElement && !imgElement.getAttribute('src').startsWith('http')) {
            imgElement.setAttribute('src', item.url);
        }
    });

    // Add animation for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
    // Add this code to your existing script.js file

    document.addEventListener('DOMContentLoaded', function () {
        // Existing code...

        // Add animation for the diagnose section
        const diagnoseSection = document.querySelector('.diagnose-section');
        const diagnoseText = document.querySelector('.diagnose-text');
        const diagnoseImage = document.querySelector('.diagnose-image');

        if (diagnoseSection) {
            // Create intersection observer for animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add animation classes when section is visible
                        diagnoseText.classList.add('animate-fade-in-left');
                        diagnoseImage.classList.add('animate-fade-in-right');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(diagnoseSection);

            // Add animation styles
            const animationStyles = document.createElement('style');
            animationStyles.textContent = `
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .animate-fade-in-left {
                animation: fadeInLeft 0.8s ease forwards;
            }
            
            .animate-fade-in-right {
                animation: fadeInRight 0.8s ease forwards;
            }
            
            .diagnose-text, .diagnose-image {
                opacity: 0;
            }
        `;
            document.head.appendChild(animationStyles);
        }

        // Add hover effect for the diagnose button
        const diagnoseButton = document.querySelector('.diagnose-text .btn-primary');
        if (diagnoseButton) {
            diagnoseButton.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.05)';
            });

            diagnoseButton.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
            });
        }

        // Simulate loading of the diagnose results
        const placeholderLines = document.querySelectorAll('.placeholder-line');
        const bulletPlaceholders = document.querySelectorAll('.bullet-placeholder');

        if (placeholderLines.length > 0) {
            // Add shimmer effect to placeholders
            const shimmerStyle = document.createElement('style');
            shimmerStyle.textContent = `
            @keyframes shimmer {
                0% {
                    background-position: -200% 0;
                }
                100% {
                    background-position: 200% 0;
                }
            }
            
            .placeholder-line, .bullet-placeholder {
                background: linear-gradient(90deg, #e9e9e9 25%, #f0f0f0 50%, #e9e9e9 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
        `;
            document.head.appendChild(shimmerStyle);
        }
    });
});