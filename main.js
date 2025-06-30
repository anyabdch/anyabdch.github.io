let projects = [];
let currentSlide = 0;

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

    portfolio.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-wrapper">
                <div class="carousel-slides" id="carousel-slides">
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
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide = (currentSlide + direction + projects.length) % projects.length;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Update carousel position
    const slidesContainer = document.getElementById('carousel-slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Set new slide index
    currentSlide = slideIndex;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Update carousel position
    const slidesContainer = document.getElementById('carousel-slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
    if (projects.length > 1) {
        changeSlide(1);
    }
}, 5000);

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', loadProjects);

function openClose(target){
    let obj = document.getElementById(target);
    obj.classList.toggle("hidden");
}

window.onresize = function() {
    if(window.innerWidth < 880){
        let menu = document.getElementById("flexibleNav");
        let butt = document.getElementById("bNav");
        butt.classList.remove("hidden");
        menu.classList.add("collapse", "navbar-collapse");
    }
    else{
        let menu = document.getElementById("flexibleNav");
        let butt = document.getElementById("bNav");
        butt.classList.add("hidden");
        menu.classList.remove("collapse", "navbar-collapse");
    }
};

function foo() {
    document.getElementById("contact").parentElement.classList.toggle("highlighted");
};
    
function meineFunktion() {
    foo();
    setTimeout(foo, 800)
};

/* window.onscroll = function() {
    let trig = document.getElementById("#carouselBar");
    let pic = document.getElementById('#b-img');
    if (trig.scrollIntoView){
        let menu = document.getElementById("#menuHeader");
        menu.setAttribute("background-color", "black !important");
    }
    if(pic.scrollIntoView){
        let menu = document.getElementById("#menuHeader");
        menu.setAttribute("background-color", "white !important");
    }
} */


