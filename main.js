// ABOUTME: Main JavaScript file for the portfolio website
// ABOUTME: Handles project carousel, timeline display, and admin functionality

let projects = [];
let timeline = [];
let currentSlide = 0;
let currentAdminTab = 'projects';

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        projects = await response.json();
        createCarousel();
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to default projects if JSON fails to load
        projects = [
            {
                id: 1,
                title: "Dear-Spotify",
                description: "A resume of sorts",
                image: "discover-weekly.jpg",
                link: "https://anyabdch.github.io/Dear-Spotify/index.html",
                technologies: ["HTML", "CSS", "JavaScript"]
            }
        ];
        createCarousel();
    }
}

function createCarousel() {
    const portfolio = document.querySelector("#projects");
    if (!portfolio || !projects.length) return;

    //reverse the order of the projects
    projects = projects.reverse();

    portfolio.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-wrapper">
                <div class="carousel-slides" id="carousel-slides" style="transform: translateX(1200px);">
                    ${projects.map((project, index) => `
                        <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
                            <div class="project-card">
                                <img class="project-image" src="images/${project.image}" alt="${project.title}">
                                <div class="project-content">
                                    <h2 class="project-title">${project.title}</h2>
                                    <p class="project-description">${project.description}</p>
                                    <div class="project-technologies">
                                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                    </div>
                                    <a class="project-link" href="${project.link}" target="_blank" rel="noopener noreferrer">
                                        View Project →
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="carousel-controls">
                <button class="carousel-btn prev-btn" onclick="changeSlide(-1)">❮</button>
                <div class="carousel-indicators">
                    ${projects.map((_, index) => `
                        <button class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></button>
                    `).join('')}
                </div>
                <button class="carousel-btn next-btn" onclick="changeSlide(1)">❯</button>
            </div>
        </div>
    `;
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const w = 800;

    startCarouselInterval(); // Reset the interval

    if (slides.length === 0) return;
    
    // Remove active class from current slide and indicator
    if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide = (currentSlide + direction + projects.length) % projects.length;
    
    // Add active class to new slide and indicator
    if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
    
    // Update carousel position
    const slidesContainer = document.getElementById('carousel-slides');
    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(${2400 - (currentSlide * w)}px)`;
    }
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const w = 800;
    
    startCarouselInterval(); // Reset the interval
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide and indicator
    if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');
    
    // Set new slide index
    currentSlide = slideIndex;
    
    // Add active class to new slide and indicator
    if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
    
    // Update carousel position
    const slidesContainer = document.getElementById('carousel-slides');
    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(${1200 - (currentSlide * w)}px)`;
    }
}

// Auto-advance carousel every 5 seconds from last interaction
let carouselInterval;

function startCarouselInterval() {
    // Clear any existing interval first
    if (carouselInterval) clearInterval(carouselInterval);
    
    // Start a new interval
    carouselInterval = setInterval(() => {
        if (projects.length > 1) {
            changeSlide(1);
        }
    }, 5000);
}

// Start the interval when page loads
startCarouselInterval();

// Timeline Functions
async function loadTimeline() {
    try {
        const response = await fetch('timeline.json');
        timeline = await response.json();
        createTimeline();
    } catch (error) {
        console.error('Error loading timeline:', error);
        // Fallback to default timeline if JSON fails to load
        timeline = [
            {
                id: 1,
                date: "2020-09",
                description: "Began undergraduate studies at Northwestern University, focusing on the intersection of education policy and social impact.",
                type: "education"
            }
        ];
        createTimeline();
    }
}

function createTimeline() {
    const container = document.querySelector("#timeline-container");
    if (!container || !timeline.length) return;

    // Sort timeline by date (newest first)
    const sortedTimeline = timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sortedTimeline.map((item, index) => `
        <div class="timeline-item" data-aos="fade-${index % 2 === 0 ? 'right' : 'left'}" data-aos-delay="${index * 100}">
            <div class="timeline-content">
                <div class="timeline-date">${formatTimelineDate(item.date)}</div>
                <div class="timeline-type ${item.type}">${item.type}</div>
                <p class="timeline-description">${item.description}</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    `).join('');
}

function formatTimelineDate(dateStr) {
    const date = new Date(dateStr + '-01'); // Add day for proper parsing
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

// Admin Functions
function toggleAdminMode() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.toggle('hidden');
    
    if (!adminPanel.classList.contains('hidden')) {
        loadAdminData();
    }
}

function switchAdminTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[onclick="switchAdminTab('${tabName}')"]`).classList.add('active');
    
    // Show/hide sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(`admin-${tabName}`).classList.remove('hidden');
    
    currentAdminTab = tabName;
}

function loadAdminData() {
    loadProjectList();
    loadTimelineList();
}

function loadProjectList() {
    const container = document.getElementById('project-list');
    if (!container) return;
    
    container.innerHTML = projects.map(project => `
        <div class="admin-item" data-id="${project.id}">
            <div class="admin-item-info">
                <h4>${project.title}</h4>
                <p>${project.description.substring(0, 80)}...</p>
            </div>
            <button class="admin-delete" onclick="deleteProject(${project.id})">Delete</button>
        </div>
    `).join('');
}

function loadTimelineList() {
    const container = document.getElementById('timeline-list');
    if (!container) return;
    
    const sortedTimeline = timeline.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = sortedTimeline.map(item => `
        <div class="admin-item" data-id="${item.id}">
            <div class="admin-item-info">
                <p>${formatTimelineDate(item.date)} - ${item.type}</p>
            </div>
            <button class="admin-delete" onclick="deleteTimelineItem(${item.id})">Delete</button>
        </div>
    `).join('');
}

// Form handlers will be attached in main initialization


function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        createCarousel();
        loadProjectList();
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}

function deleteTimelineItem(id) {
    if (confirm('Are you sure you want to delete this timeline item?')) {
        timeline = timeline.filter(t => t.id !== id);
        createTimeline();
        loadTimelineList();
        localStorage.setItem('timeline', JSON.stringify(timeline));
        
        // Reinitialize AOS for remaining elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// Load data from localStorage if available
function loadFromStorage() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    }
    
    const savedTimeline = localStorage.getItem('timeline');
    if (savedTimeline) {
        timeline = JSON.parse(savedTimeline);
    }
}

// Enhanced initialization with modern features
document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    loadProjects();
    loadTimeline();
    initializeParticles();
    initializeTypedText();
    initializeEnhancements();
    
    // Initialize responsive navigation on page load
    initializeResponsiveNavigation();
    
    // Attach form handlers
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addProject();
        });
    }
    
    const timelineForm = document.getElementById('timeline-form');
    if (timelineForm) {
        timelineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addTimelineItem();
        });
    }
});

// Initialize responsive navigation
function initializeResponsiveNavigation() {
    handleResize(); // Call on load
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
}

function handleResize() {
    if(window.innerWidth < 1024){
        let menu = document.getElementById("flexibleNav");
        let butt = document.getElementById("bNav");
        if (menu && butt) {
            butt.classList.remove("hidden");
            menu.classList.add("collapse", "navbar-collapse");
        }
    }
    else{
        let menu = document.getElementById("flexibleNav");
        let butt = document.getElementById("bNav");
        if (menu && butt) {
            butt.classList.add("hidden");
            menu.classList.remove("collapse", "navbar-collapse");
        }
    }
}

// Particle.js configuration for background effects
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: ["#667eea", "#764ba2", "#f093fb", "#4facfe"] },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#667eea",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Initialize typed.js for dynamic bio text
function initializeTypedText() {
    if (typeof Typed !== 'undefined') {
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed('#typed-text', {
                strings: [
                    'Full-Stack Developer 💻',
                    'Social Policy BSEd, Computer Science MS 🎓',
                    'NYT Crosswords Fanatic 🧩',
                    'Creative Problem Solver 💡',
                    'EdTech Enthusiast 📚',
                    'Backcountry Hiker 🏔️',
                    'Educator ❤️',
                    'Struggling Plant Mom 🌱'
                ],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 1500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }
}

// Initialize enhanced features
function initializeEnhancements() {
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Touch/swipe support
    initializeTouchSupport();
    
    // Performance optimizations
    initializeIntersectionObserver();
}

function openClose(target){
    let obj = document.getElementById(target);
    obj.classList.toggle("hidden");
}


function foo() {
    document.getElementById("contact").parentElement.classList.toggle("highlighted");
};
    
function meineFunktion() {
    foo();
    setTimeout(foo, 800)
};

// Enhanced Features from web_opt_1

// Keyboard navigation support
function handleKeyboardNavigation(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'Escape') {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel && !adminPanel.classList.contains('hidden')) {
            toggleAdminMode();
        }
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function initializeTouchSupport() {
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left, go to next slide
        } else {
            changeSlide(-1); // Swipe right, go to previous slide
        }
    }
}

// Enhanced notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const gradients = {
        success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        error: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${gradients[type] || gradients.success};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Intersection Observer for performance
function initializeIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe timeline and project elements
    setTimeout(() => {
        const observeElements = document.querySelectorAll('.timeline-item, .project-card');
        observeElements.forEach(el => observer.observe(el));
    }, 1000);
}

// Enhanced add functions with notifications
function addProject() {
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const image = document.getElementById('project-image').value;
    const link = document.getElementById('project-link').value;
    const technologies = document.getElementById('project-technologies').value.split(',').map(t => t.trim());
    
    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        title,
        description,
        image,
        link,
        technologies
    };
    
    projects.push(newProject);
    
    // Update displays
    createCarousel();
    loadProjectList();
    
    // Clear form
    document.getElementById('project-form').reset();
    
    // Save to localStorage for persistence
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Show success notification
    showNotification('Project added successfully! 🎉', 'success');
}

function addTimelineItem() {
    const date = document.getElementById('timeline-date').value;
    const description = document.getElementById('timeline-description').value;
    const type = document.getElementById('timeline-type').value;
    
    const newItem = {
        id: timeline.length > 0 ? Math.max(...timeline.map(t => t.id)) + 1 : 1,
        date,
        description,
        type
    };
    
    timeline.push(newItem);
    
    // Update displays
    createTimeline();
    loadTimelineList();
    
    // Clear form
    document.getElementById('timeline-form').reset();
    
    // Save to localStorage for persistence
    localStorage.setItem('timeline', JSON.stringify(timeline));
    
    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Show success notification
    showNotification('Timeline item added successfully! ⭐', 'success');
}


