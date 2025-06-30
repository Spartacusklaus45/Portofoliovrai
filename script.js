// Smooth scrolling for navigation links
// Initialize EmailJS with public key
(function() {
    emailjs.init({
        publicKey: "KiYkIj8_ro6uZ10SC",
    });
})();

// Fonction pour obtenir le message de salutation en fonction de l'heure
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return '👋 Bonjour !';
    } else if (hour >= 12 && hour < 18) {
        return '👋 Bon après-midi !';
    } else if (hour >= 18 && hour < 22) {
        return '👋 Bonsoir !';
    } else {
        return '🌙 Bonsoir !';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour le message de salutation
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        greetingElement.textContent = getGreeting();
    }
    // Système de filtrage des projets et slides
    function initializeProjects() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        const projectTexts = document.querySelectorAll('.project-text');
        const campaignSlides = document.querySelectorAll('.campaign-slide');
        const slideDots = document.querySelectorAll('.slide-dot');

        // Fonction pour changer de slide
        function switchSlide(slideNumber) {
            // Mise à jour des points de navigation
            slideDots.forEach(dot => {
                if (dot.dataset.slide === slideNumber) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Mise à jour des slides
            campaignSlides.forEach(slide => {
                if (slide.dataset.slide === slideNumber) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Mise à jour des images dans project-display
            const projectCards = document.querySelectorAll('.project-card[data-category="digital"]');
            projectCards.forEach(card => {
                if (card.dataset.slide === slideNumber) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }

        // Gestionnaire de clic pour les points de navigation
        slideDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideNumber = dot.dataset.slide;
                switchSlide(slideNumber);
            });
        });

        function switchProject(category) {
            // Mise à jour des boutons
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Mise à jour des cartes
            projectCards.forEach(card => {
                if (card.dataset.category === category) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });

            // Mise à jour des textes
            projectTexts.forEach(text => {
                if (text.dataset.category === category) {
                    text.classList.add('active');
                } else {
                    text.classList.remove('active');
                }
            });

            // Si on passe à la catégorie digital, afficher le premier slide
            if (category === 'digital') {
                switchSlide('1');
            }
        }

        // Gestionnaire de clic pour les boutons de filtre
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.filter;
                switchProject(category);
            });
        });

        // Initialiser avec le premier slide de la catégorie digital
        switchProject('digital');
        switchSlide('1');
    }

    // Initialiser le système de projets
    initializeProjects();
    // Gestion de l'expansion des expériences
    const expandBtns = document.querySelectorAll('.expand-btn');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const experienceItem = this.closest('.experience-item');
            experienceItem.classList.toggle('expanded');
        });
    });

    // Section animations
    const sections = document.querySelectorAll('section');
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carousel Navigation
    const navDots = document.querySelectorAll('.nav-dot');
    const slides = document.querySelectorAll('.project-text[data-category="digital"]');

    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideNumber = dot.dataset.slide;
            
            // Update active dot
            navDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            // Update active slide
            projectTexts.forEach(text => {
                if (text.dataset.slide === slideNumber) {
                    text.classList.add('active');
                } else {
                    text.classList.remove('active');
                }
            });
        });
    });



    // Project filtering and slides
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectTexts = document.querySelectorAll('.project-text');
    const campaignSlides = document.querySelectorAll('.campaign-slide');
    const slideDots = document.querySelectorAll('.slide-dot');
    const projectDisplay = document.querySelector('.project-display');

    // Fonction pour afficher un slide spécifique
    function showSlide(slideNumber) {
        // Mettre à jour les points de navigation
        slideDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.slide === slideNumber);
        });

        // Mettre à jour les slides
        campaignSlides.forEach(slide => {
            slide.classList.toggle('active', slide.dataset.slide === slideNumber);
        });
    }

    // Gestionnaire d'événements pour les points de navigation
    slideDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideNumber = dot.dataset.slide;
            showSlide(slideNumber);
        });
    });

    // Fonction pour afficher un projet spécifique
    function showProject(category) {
        // Mettre à jour les boutons de filtre
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        // Mettre à jour les cartes de projet
        projectCards.forEach(card => {
            card.classList.toggle('active', card.dataset.category === category);
        });

        // Mettre à jour les textes de projet
        projectTexts.forEach(text => {
            text.classList.toggle('active', text.dataset.category === category);
        });

        // Réinitialiser au premier slide pour la catégorie digital
        if (category === 'digital') {
            showSlide('1');
        }
    }

    // Gestionnaire d'événements pour les boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            showProject(category);
        });
    });

    // S'assurer que le projet par défaut est affiché au chargement
    showProject('digital');

    // Experience section expand/collapse
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.closest('.experience-content');
            const description = content.querySelector('.description');
            
            if (description) {
                const isExpanded = description.style.display !== 'none';
                description.style.display = isExpanded ? 'none' : 'block';
                button.textContent = isExpanded ? '+' : '-';
            }
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = contactForm.querySelector('.form-status');
    const submitButton = contactForm.querySelector('.send-btn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';

        // Prepare template parameters
        const templateParams = {
            from_name: this.user_name.value,
            time: new Date().toLocaleString(),
            from_email: this.user_email.value,
            phone: this.user_phone.value,
            project_type: this.project_type.value,
            message: this.message.value,
            title: 'Nouveau message du portfolio',
            email: this.user_email.value
        };

        // Send email using EmailJS
        emailjs.send('service_6kiutxc', 'template_uibliho', templateParams, 'KiYkIj8_ro6uZ10SC')
            .then(function() {
                formStatus.textContent = 'Message envoyé avec succès!';
                formStatus.classList.add('success');
                contactForm.reset();
            })
            .catch(function(error) {
                formStatus.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                formStatus.classList.add('error');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                formStatus.style.display = 'block';
            });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button:not(.expand-btn)');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Add smooth fade-in animation for sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'transform 0.2s ease';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Add smooth fade-in animation for sections
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
