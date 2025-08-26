// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.getElementById('body');
const html = document.documentElement;

// Check for saved dark mode preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
}

darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    // Save preference to localStorage
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Role Text Animation
const roles = [
    'Frontend Developer',
    'Backend Developer', 
    'Full Stack Developer',
    'Software Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const roleElement = document.getElementById('roleText');
    if (!roleElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next role
    }
    
    setTimeout(typeRole, typeSpeed);
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary', 'font-semibold');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Navbar Background on Scroll
const navbar = document.querySelector('nav');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/90', 'dark:bg-gray-900/90');
            navbar.classList.remove('bg-white/80', 'dark:bg-gray-900/80');
        } else {
            navbar.classList.add('bg-white/80', 'dark:bg-gray-900/80');
            navbar.classList.remove('bg-white/90', 'dark:bg-gray-900/90');
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill Progress Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-item .bg-gradient-to-r');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-in-out';
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Submit form to FormSubmit
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        // Create a hidden iframe for form submission
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'hiddenFrame';
        document.body.appendChild(iframe);
        
        // Set form target to iframe
        this.target = 'hiddenFrame';
        
        // Submit the actual form
        this.submit();
        
        // Show success message after a delay
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Remove iframe after submission
            if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Project Cards Hover Effect
document.querySelectorAll('#projects .group').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('scale-105');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('scale-105');
    });
});

// Social Links Hover Effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.classList.add('scale-110');
    });
    
    link.addEventListener('mouseleave', function() {
        this.classList.remove('scale-110');
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start the typing animation
    setTimeout(typeRole, 1000);
    
    // Add fade-in animation to hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.classList.add('animate-fade-in');
    }
    
    // Add staggered animation to navigation items
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fade-in');
    });
});

// Skills Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSkillsSection();
});

function initializeSkillsSection() {
    const skillsContainer = document.querySelector('.skills-container');
    const tabButtons = document.querySelectorAll('.skills-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Set up grid layout for skills container
    if (skillsContainer) {
        skillsContainer.style.display = 'grid';
        skillsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        skillsContainer.style.gap = '20px';
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterSkills(category);
            updateActiveTab(this);
        });
    });
    
    // Initialize with default active tab styles
    updateTabStyles();
    
    // Animate skill bars when skills section comes into view
    animateSkillBars();
}

function filterSkills(category) {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate card appearance
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function updateActiveTab(activeButton) {
    const tabButtons = document.querySelectorAll('.skills-tab-btn');
    
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
    updateTabStyles();
}

function updateTabStyles() {
    const tabButtons = document.querySelectorAll('.skills-tab-btn');
    
    tabButtons.forEach(button => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = 'rgb(14, 165, 233)'; // primary color
            button.style.color = 'white';
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
        } else {
            button.style.backgroundColor = 'transparent';
            button.style.color = 'rgb(107, 114, 128)'; // gray-500
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        }
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                // Reset width first
                bar.style.width = '0%';
                bar.style.transition = 'none';
                
                // Animate to target width
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Function to render projects dynamically
function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    // Clear existing content
    projectsContainer.innerHTML = '';

    // Render each project
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Function to create individual project card
function createProjectCard(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group';
    projectDiv.setAttribute('data-category', project.category);

    // Create technologies HTML
    const technologiesHTML = project.technologies.map(tech => {
        const colorClass = technologyColors[tech.color];
        return `<span class="${colorClass.bg} ${colorClass.text} px-2 py-1 rounded text-xs">${tech.name}</span>`;
    }).join('');

    // Create image or fallback
    const imageHTML = project.image 
        ? `<img src="${project.image}" alt="${project.alt}" class="object-contain group-hover:scale-110 transition-transform" />`
        : `<div class="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
             <i class="fas fa-code text-white text-4xl group-hover:scale-110 transition-transform"></i>
           </div>`;

    projectDiv.innerHTML = `
        ${imageHTML}
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">${project.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                ${project.description}
            </p>
            <div class="flex flex-wrap gap-3 mb-4">
                ${technologiesHTML}
            </div>
            <div class="flex justify-between">
                <a href="${project.links.github}" target="_blank" class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <i class="fab fa-github mr-1"></i>Code
                </a>
                <a href="${project.links.live}" target="_blank" class="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    <i class="fas fa-external-link-alt mr-1"></i>Live
                </a>
            </div>
        </div>
    `;

    return projectDiv;
}

// Project Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsSection();
});

function initializeProjectsSection() {
    const projectsContainer = document.querySelector('.projects-container');
    const tabButtons = document.querySelectorAll('.projects-tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProjects(category);
            updateActiveProjectTab(this);
        });
    });
    
    // Initialize with default active tab styles
    updateProjectTabStyles();
}


// Update the project filtering function to work with dynamic content
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            // Add fade-in animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 300);
        }
    });
}

function updateActiveProjectTab(activeButton) {
    const tabButtons = document.querySelectorAll('.projects-tab-btn');
    
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
    updateProjectTabStyles();
}

function updateProjectTabStyles() {
    const tabButtons = document.querySelectorAll('.projects-tab-btn');
    
    tabButtons.forEach(button => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = 'rgb(14, 165, 233)'; // primary color
            button.style.color = 'white';
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
        } else {
            button.style.backgroundColor = 'transparent';
            button.style.color = 'rgb(107, 114, 128)'; // gray-500
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        }
    });
}

// Enhanced hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const email = formData.get('email');
        
        // Basic validation
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for subscribing! You\'ll receive updates on new projects and blog posts.', 'success');
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Enhanced Footer Navigation Smooth Scrolling
document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Custom CSS animations (to be added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
    
    .project-card:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    
    .skill-item .bg-gradient-to-r {
        transition: width 0.1s ease-in-out;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #0ea5e9 0%, #6d28d9 100%);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #0284c7 0%, #5b21b6 100%);
    }
    
    /* Dark mode scrollbar */
    .dark ::-webkit-scrollbar-track {
        background: #374151;
    }
    
    /* Tech image animation */
    .tech-image {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#home');
    const rate = scrolled * -0.5;
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        // Add some fun animation
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render projects dynamically
    renderProjects();
    
    // Initialize project filtering
    const projectTabs = document.querySelectorAll('.projects-tab-btn');
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            projectTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(category);
        });
    });
    
    // Set initial filter to "all"
    filterProjects('all');
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('🚀 Portfolio website loaded successfully!');
console.log('💡 Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A');
