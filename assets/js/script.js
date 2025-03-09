$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Ram kolisetti";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});
// <!-- tilt js effect ends -->


// Loader functionality
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    // Hide loader after 1 second (you can adjust this time)
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }, 1000);
});

// Fallback if loading takes too long
setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
    }
}, 5000); // 5 second fallback

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

// Enhanced scroll reveal animations
ScrollReveal({
    reset: false,
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Hero section reveals
ScrollReveal().reveal('.home .greeting', { 
    origin: 'left', 
    delay: 100,
    distance: '40px' 
});
ScrollReveal().reveal('.home .name', { 
    origin: 'left', 
    delay: 300,
    distance: '40px' 
});
ScrollReveal().reveal('.home .text-animate', { 
    origin: 'left', 
    delay: 500,
    distance: '40px' 
});
ScrollReveal().reveal('.home .description', { 
    origin: 'left', 
    delay: 700,
    distance: '40px' 
});
ScrollReveal().reveal('.home .cta-buttons', { 
    origin: 'bottom', 
    delay: 900,
    distance: '40px' 
});
ScrollReveal().reveal('.home .socials', { 
    origin: 'bottom', 
    delay: 1100,
    distance: '40px' 
});
ScrollReveal().reveal('.home .hero-image', { 
    origin: 'right', 
    delay: 300,
    distance: '40px' 
});

// Add smooth mouse parallax effect to hero image
document.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    const speed = 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;

    heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    
    const progress = `${(scrolled / scrollable) * 100}%`;
    scrollProgress.style.width = progress;
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectBoxes = document.querySelectorAll('.box');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectBoxes.forEach(box => {
      if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
        box.style.display = 'block';
        // Add animation when showing
        box.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        box.style.display = 'none';
      }
    });
  });
});

// Project Image Gallery
document.querySelectorAll('.project-gallery img').forEach(img => {
  img.addEventListener('click', function() {
    // Get the main project image
    const mainImage = this.closest('.project-image').querySelector('img:not(.project-gallery img)');
    
    // Store the current main image source
    const currentMainSrc = mainImage.src;
    
    // Update main image with clicked gallery image
    mainImage.src = this.src;
    
    // Update clicked gallery image with previous main image
    this.src = currentMainSrc;
    
    // Add active class to clicked image
    document.querySelectorAll('.project-gallery img').forEach(galleryImg => {
      galleryImg.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Project Icon Gallery
document.querySelectorAll('.icon-gallery img').forEach(img => {
  img.addEventListener('click', function() {
    // Get the main project icon
    const mainIcon = this.closest('.project-icon').querySelector('img:not(.icon-gallery img)');
    
    // Store the current main icon source
    const currentMainSrc = mainIcon.src;
    
    // Update main icon with clicked gallery icon
    mainIcon.src = this.src;
    
    // Update clicked gallery icon with previous main icon
    this.src = currentMainSrc;
    
    // Add active class to clicked icon
    document.querySelectorAll('.icon-gallery img').forEach(galleryIcon => {
      galleryIcon.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Project Modal
const modal = document.querySelector('.project-modal');
const viewButtons = document.querySelectorAll('.view-project');
const closeModal = document.querySelector('.close-modal');

// Project data
const projectData = {
  portfolio: {
    title: 'Portfolio Website',
    icon: './assets/images/projects/portfolio.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    description: 'A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features include dark mode, interactive terminal, and smooth animations.',
    details: [
      { icon: 'fas fa-calendar', text: '2024' },
      { icon: 'fas fa-code-branch', text: 'Frontend' }
    ],
    liveUrl: '#',
    codeUrl: 'https://github.com/Ram-Kolisetti/Portfolio-Website'
  },
  shop: {
    title: 'Shop Management System',
    icon: './assets/images/projects/shop.png',
    techStack: ['PHP', 'MySQL', 'JavaScript'],
    description: 'A comprehensive shop management system with features like inventory tracking, employee management, and sales analytics.',
    details: [
      { icon: 'fas fa-calendar', text: '2023' },
      { icon: 'fas fa-code-branch', text: 'Full Stack' }
    ],
    liveUrl: '#',
    codeUrl: '#'
  },
  hospital: {
    title: 'Hospital Management System',
    icon: './assets/images/projects/hospital.png',
    techStack: ['React', 'Node.js', 'MongoDB'],
    description: 'A full-stack hospital management system featuring patient records, appointment scheduling, and billing management.',
    details: [
      { icon: 'fas fa-calendar', text: '2023' },
      { icon: 'fas fa-code-branch', text: 'Full Stack' }
    ],
    liveUrl: '#',
    codeUrl: '#'
  },
  iot: {
    title: 'IoT Soil Monitoring System',
    icon: './assets/images/projects/iot.png',
    techStack: ['ESP-12E', 'Arduino', 'Python'],
    description: 'An IoT-based soil monitoring system using ESP-12E and sensors for pH analysis and moisture detection.',
    details: [
      { icon: 'fas fa-calendar', text: '2023' },
      { icon: 'fas fa-code-branch', text: 'IoT' }
    ],
    liveUrl: '#',
    codeUrl: '#'
  }
};

// Open modal
viewButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const projectId = button.getAttribute('data-project');
    const project = projectData[projectId];

    // Update modal content
    modal.querySelector('.modal-icon img').src = project.icon;
    modal.querySelector('.modal-title').textContent = project.title;
    
    // Update tech stack
    const techStackHtml = project.techStack.map(tech => `<span>${tech}</span>`).join('');
    modal.querySelector('.modal-tech-stack').innerHTML = techStackHtml;
    
    // Update description
    modal.querySelector('.modal-description').textContent = project.description;
    
    // Update details
    const detailsHtml = project.details.map(detail => `
      <div class="detail-item">
        <i class="${detail.icon}"></i>
        <span>${detail.text}</span>
      </div>
    `).join('');
    modal.querySelector('.modal-details').innerHTML = detailsHtml;
    
    // Update buttons
    modal.querySelector('.view-live').href = project.liveUrl;
    modal.querySelector('.view-code').href = project.codeUrl;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Remove all floating elements and bubbles
    const floatingElements = document.querySelectorAll('.floating-element, .hero-bubbles, .hero-bubble, .floating-elements, .skill-bubble');
    floatingElements.forEach(element => {
        if (element) {
            element.remove();
        }
    });

    // Initialize other components
    initScrollAnimations();
    initProjectFilter();
    initModal();
    initContactForm();
    initThemeToggle();
    
    // Create and initialize particles
    createParticles();
});

// Particle system
function createParticles() {
    const container = document.querySelector('.home');
    if (!container) return;

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    container.appendChild(particleContainer);

    // Create 20 particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 5 and 15 pixels
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random color with opacity
        const hue = Math.random() * 360;
        particle.style.backgroundColor = `hsla(${hue}, 70%, 50%, 0.3)`;
        
        // Random movement speed
        particle.dataset.speed = Math.random() * 2 + 1;
        
        particleContainer.appendChild(particle);
    }

    // Initialize particle animation
    initParticleAnimation();
}

function initParticleAnimation() {
    const particles = document.querySelectorAll('.particle');
    const cursor = { x: 0, y: 0, radius: 150 };
    
    // Track cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
    });

    function animateParticles() {
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            // Calculate distance from cursor
            const dx = cursor.x - particleX;
            const dy = cursor.y - particleY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Get particle speed
            const speed = parseFloat(particle.dataset.speed);
            
            if (distance < cursor.radius) {
                // Calculate repulsion force
                const angle = Math.atan2(dy, dx);
                const force = (cursor.radius - distance) / cursor.radius;
                const moveX = Math.cos(angle) * force * speed * 10;
                const moveY = Math.sin(angle) * force * speed * 10;
                
                // Apply movement
                const currentX = parseFloat(particle.style.left) || 0;
                const currentY = parseFloat(particle.style.top) || 0;
                
                particle.style.left = `${currentX + moveX}%`;
                particle.style.top = `${currentY + moveY}%`;
                
                // Add slight rotation
                const rotation = Math.random() * 360;
                particle.style.transform = `rotate(${rotation}deg)`;
            } else {
                // Return to original position slowly
                const currentX = parseFloat(particle.style.left) || 0;
                const currentY = parseFloat(particle.style.top) || 0;
                
                particle.style.left = `${currentX + (Math.random() - 0.5) * speed}%`;
                particle.style.top = `${currentY + (Math.random() - 0.5) * speed}%`;
            }
        });
        
        requestAnimationFrame(animateParticles);
    }

    // Start animation
    animateParticles();
}