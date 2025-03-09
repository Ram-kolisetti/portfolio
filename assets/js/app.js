/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

// Update the particles configuration to be dynamic based on theme
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        console.warn('Particles container not found');
        return;
    }

    try {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: document.body.classList.contains('dark-mode') ? '#ffffff' : '#000000'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#000000',
                    opacity: 0.4,
                    width: 1,
                    color_rgb_line: document.body.classList.contains('dark-mode') ? 
                        { r: 255, g: 255, b: 255 } : 
                        { r: 0, g: 0, b: 0 }
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1,
                            color: document.body.classList.contains('dark-mode') ? '#ffffff' : '#000000'
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
}

// Function to update particles on theme change
function updateParticlesColor(isDark) {
    if (window.pJSDom && window.pJSDom[0]) {
        try {
            const pJS = window.pJSDom[0].pJS;
            const newColor = isDark ? '#ffffff' : '#000000';
            const newColorRgb = isDark ? 
                { r: 255, g: 255, b: 255 } : 
                { r: 0, g: 0, b: 0 };

            // Update all color properties
            pJS.particles.color.value = newColor;
            pJS.particles.line_linked.color = newColor;
            pJS.particles.line_linked.color_rgb_line = newColorRgb;
            pJS.particles.shape.stroke.color = newColor;

            // Update interaction colors
            if (pJS.interactivity.modes.grab) {
                pJS.interactivity.modes.grab.line_linked.color = newColor;
            }

            // Destroy and reinitialize particles
            pJS.fn.particlesEmpty();
            pJS.fn.particlesCreate();
        } catch (error) {
            console.error('Error updating particles color:', error);
        }
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    
    // Check initial theme and set particles accordingly
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
        updateParticlesColor(true);
    }
});

// Update particles when theme changes
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('dark-mode');
            updateParticlesColor(isDark);
        });
    }
});