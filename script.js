 // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            });
        });

        // Form submission
//         document.getElementById('contactForm').addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             const formData = new FormData(this);
//             const nombre = formData.get('nombre');
//             const email = formData.get('email');
//             const telefono = formData.get('telefono');
//             const mensaje = formData.get('mensaje');
            
//             // Create email body
//             const emailBody = `
// Nuevo mensaje desde la página web:

// Nombre: ${nombre}
// Email: ${email}
// Teléfono: ${telefono}
// Mensaje: ${mensaje}
//             `.trim();
            
//             // Create mailto link
//             const mailtoLink = `mailto:venturomoralesluis@gmail.com?subject=Nueva consulta desde la web&body=${encodeURIComponent(emailBody)}`;
            
//             // Open email client
//             window.location.href = mailtoLink;
            
//             // Show success message
//             alert('¡Gracias por contactarnos! Se abrirá tu cliente de email para enviar el mensaje.');
            
//             // Reset form
//             this.reset();
//         });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(4, 124, 196, 1.0)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #047cc4 0%, #0c84c4 50%, #9cdcf4 100%)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .team-card, .stat-item, .location-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Slider functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active', 'prev'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add prev class to current slide before changing
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].classList.add('prev');
            }

            // Update current slide index
            currentSlideIndex = index;

            // Add active class to current slide and dot
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].classList.add('active');
            }
            if (dots[currentSlideIndex]) {
                dots[currentSlideIndex].classList.add('active');
            }
        }

        function changeSlide(direction) {
            let newIndex = currentSlideIndex + direction;
            
            if (newIndex >= totalSlides) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = totalSlides - 1;
            }
            
            showSlide(newIndex);
        }

        function currentSlide(index) {
            showSlide(index - 1);
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            changeSlide(1);
        }, 5000);

        // Banner functionality
        const bannerTexts = [
            "🎉 ¡Promoción especial! Consultas ginecológicas con 30% de descuento durante todo enero",
            "📅 Agenda tu cita online las 24 horas - Sistema disponible en nuestra web",
            "🏥 Nuevo equipo de ultrasonido 4D - Tecnología de última generación",
            "👩‍⚕️ Bienvenida Dra. Patricia Silva - Especialista en medicina reproductiva"
        ];

        let currentBannerIndex = 0;

        function rotateBannerText() {
            const bannerTextElement = document.getElementById('bannerText');
            if (bannerTextElement) {
                bannerTextElement.style.opacity = '0';
                setTimeout(() => {
                    currentBannerIndex = (currentBannerIndex + 1) % bannerTexts.length;
                    bannerTextElement.textContent = bannerTexts[currentBannerIndex];
                    bannerTextElement.style.opacity = '1';
                }, 300);
            }
        }

        // Rotate banner text every 4 seconds
        setInterval(rotateBannerText, 4000);

        function closeBanner() {
            const banner = document.querySelector('.announcements-banner');
            banner.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
                }
            }, 20);
        

        // Counter animation for stats
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
                }
            }, 20);
        }

        // Animate stats when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const value = parseInt(statNumber.textContent);
                    if (!isNaN(value)) {
                        animateCounter(statNumber, value);
                    }
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-item').forEach(stat => {
            statsObserver.observe(stat);
        });