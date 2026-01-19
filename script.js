document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    let currentTestimonial = 0;

    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });

        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    setInterval(nextTestimonial, 7000);

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    const galleryItemsClickable = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItemsClickable.forEach(item => {
        item.addEventListener('click', () => {
            const clone = item.querySelector('.gallery-placeholder').cloneNode(true);
            clone.style.width = '600px';
            clone.style.height = '600px';
            clone.style.maxWidth = '90vw';
            clone.style.maxHeight = '90vh';
            lightboxContent.innerHTML = '';
            lightboxContent.appendChild(clone);
            lightbox.classList.add('show');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        console.log('Form submitted:', { name, email, phone, subject, message });

        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    });

    const readMoreBtns = document.querySelectorAll('.read-more');
    const modal = document.getElementById('newsModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    const newsContent = {
        modal1: {
            title: 'Science Fair Winners Announced',
            date: 'March 15, 2024',
            content: `
                <p>Golden Future School is proud to announce that our students have achieved outstanding success at the Regional Science Fair, securing top positions with their innovative and groundbreaking projects.</p>
                
                <p>Our students presented exceptional projects in renewable energy and biotechnology, demonstrating not only their scientific knowledge but also their commitment to solving real-world problems. The winning projects included:</p>
                
                <ul>
                    <li><strong>First Place:</strong> "Solar-Powered Water Purification System" by Sarah Johnson and team</li>
                    <li><strong>Second Place:</strong> "Biodegradable Plastics from Algae" by Michael Chen</li>
                    <li><strong>Third Place:</strong> "AI-Powered Crop Disease Detection" by Emily Rodriguez</li>
                </ul>
                
                <p>These projects will now advance to the National Science Fair competition in May. We are incredibly proud of all our participants and wish our winners the best of luck at nationals!</p>
                
                <p>This achievement reflects the dedication of our students, the excellence of our STEM program, and the support of our amazing faculty. Congratulations to all!</p>
            `
        },
        modal2: {
            title: 'Spring Musical: A Midsummer Night\'s Dream',
            date: 'March 10, 2024',
            content: `
                <p>The Golden Future School Drama Department is thrilled to present our spring musical production of Shakespeare's beloved comedy, "A Midsummer Night's Dream"!</p>
                
                <p>This magical tale of love, mischief, and enchantment comes to life through the talented performances of our students, featuring stunning sets, beautiful costumes, and original music arrangements.</p>
                
                <p><strong>Performance Dates:</strong></p>
                <ul>
                    <li>Friday, March 20 at 7:00 PM</li>
                    <li>Saturday, March 21 at 2:00 PM and 7:00 PM</li>
                    <li>Sunday, March 22 at 2:00 PM</li>
                </ul>
                
                <p><strong>Location:</strong> Golden Future School Auditorium</p>
                
                <p><strong>Tickets:</strong> $10 for adults, $5 for students and seniors. Available at the school office or at the door.</p>
                
                <p>Join us for an unforgettable theatrical experience! Bring your family and friends to support our talented student performers.</p>
            `
        },
        modal3: {
            title: 'New STEM Lab Opening Ceremony',
            date: 'March 5, 2024',
            content: `
                <p>Golden Future School is excited to announce the grand opening of our state-of-the-art STEM laboratory, a significant milestone in our commitment to providing world-class science and technology education.</p>
                
                <p>The new facility features:</p>
                <ul>
                    <li>Advanced microscopy and imaging equipment</li>
                    <li>3D printing and rapid prototyping stations</li>
                    <li>Robotics and automation workstations</li>
                    <li>Chemistry and biology research areas</li>
                    <li>Computer science and coding labs</li>
                    <li>Collaborative learning spaces</li>
                </ul>
                
                <p>This $2 million investment was made possible through generous donations from our alumni community, local businesses, and a grant from the National Science Foundation.</p>
                
                <p>The opening ceremony will take place on March 18th at 10:00 AM, featuring keynote speaker Dr. Jennifer Martinez, renowned physicist and Golden Future alumna (Class of 1998).</p>
                
                <p>All students, parents, and community members are invited to tour the new facility and witness firsthand how we're preparing our students for the future.</p>
            `
        },
        modal4: {
            title: 'Basketball Team Wins Championship',
            date: 'February 28, 2024',
            content: `
                <p>The Golden Future School varsity basketball team has made history by winning the Regional Championship with a thrilling 78-72 victory over longtime rivals, Riverside High School!</p>
                
                <p>In an electrifying final game that kept spectators on the edge of their seats, our team demonstrated exceptional skill, teamwork, and determination. Team captain Marcus Williams led the charge with 28 points, 12 rebounds, and 6 assists, earning him the tournament MVP award.</p>
                
                <p><strong>Season Highlights:</strong></p>
                <ul>
                    <li>Overall record: 24-3</li>
                    <li>Conference champions</li>
                    <li>Regional champions</li>
                    <li>Five players named to All-Conference team</li>
                </ul>
                
                <p>Head Coach Lisa Anderson praised the team's dedication: "These athletes have worked incredibly hard all season. They've shown that with teamwork, discipline, and perseverance, anything is possible. I couldn't be prouder."</p>
                
                <p>The team will now advance to the State Championship tournament, which begins on March 15th. Let's show our support as they continue their historic run!</p>
                
                <p>Go Golden Eagles!</p>
            `
        }
    };

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const content = newsContent[modalId];
            
            if (content) {
                modalBody.innerHTML = `
                    <span style="color: var(--gold-dark); font-weight: 600;">${content.date}</span>
                    <h2>${content.title}</h2>
                    ${content.content}
                `;
                modal.classList.add('show');
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
            lightbox.classList.remove('show');
        }
    });

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

    document.querySelectorAll('.program-card, .news-card, .staff-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
