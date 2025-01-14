// Hero Slider Configuration
const heroSliderConfig = {
    images: [
        {
            url: 'images/hero-1.jpg',
            alt: 'Sustainable Energy Solutions'
        },
        {
            url: 'images/hero-2.jpg',
            alt: 'Green Technology'
        },
        {
            url: 'images/hero-3.jpg',
            alt: 'Renewable Energy'
        }
    ],
    interval: 5000 // 5 seconds
};

// Project Slider Configuration
const projectSliderConfig = {
    projects: [
        {
            title: 'Solar Farm Project',
            description: 'Large-scale solar energy implementation',
            image: 'images/project-1.jpg'
        },
        {
            title: 'Wind Energy Complex',
            description: 'Offshore wind turbine installation',
            image: 'images/project-2.jpg'
        },
        {
            title: 'Biomass Facility',
            description: 'Sustainable biomass energy production',
            image: 'images/project-3.jpg'
        }
    ],
    interval: 4000 // 4 seconds
};

class Slider {
    constructor(elementId, config, type) {
        this.element = document.getElementById(elementId);
        this.config = config;
        this.type = type;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createSlides();
        this.startAutoSlide();
        this.addControls();
    }

    createSlides() {
        if (this.type === 'hero') {
            this.createHeroSlides();
        } else if (this.type === 'project') {
            this.createProjectSlides();
        }
    }

    createHeroSlides() {
        this.config.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide' + (index === 0 ? ' active' : '');
            slide.style.backgroundImage = `url(${image.url})`;
            this.element.appendChild(slide);
        });
    }

    createProjectSlides() {
        this.config.projects.forEach((project, index) => {
            const slide = document.createElement('div');
            slide.className = 'project-slide' + (index === 0 ? ' active' : '');
            slide.innerHTML = `
                <div class="project-card">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="#" class="project-link">Learn More</a>
                    </div>
                </div>
            `;
            this.element.appendChild(slide);
        });
    }

    startAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, this.config.interval);
    }

    nextSlide() {
        const slides = this.element.getElementsByClassName(
            this.type === 'hero' ? 'hero-slide' : 'project-slide'
        );
        slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % slides.length;
        slides[this.currentIndex].classList.add('active');
    }

    prevSlide() {
        const slides = this.element.getElementsByClassName(
            this.type === 'hero' ? 'hero-slide' : 'project-slide'
        );
        slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex - 1 + slides.length) % slides.length;
        slides[this.currentIndex].classList.add('active');
    }

    addControls() {
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-control prev';
        prevButton.innerHTML = '❮';
        prevButton.addEventListener('click', () => this.prevSlide());

        const nextButton = document.createElement('button');
        nextButton.className = 'slider-control next';
        nextButton.innerHTML = '❯';
        nextButton.addEventListener('click', () => this.nextSlide());

        this.element.appendChild(prevButton);
        this.element.appendChild(nextButton);
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = new Slider('heroSlider', heroSliderConfig, 'hero');
    const projectSlider = new Slider('projectSlider', projectSliderConfig, 'project');
});