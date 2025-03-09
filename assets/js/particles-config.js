function loadParticles() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const particleColor = isDarkMode ? "#ffffff" : "#000000";

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: particleColor,
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "bounce",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.6
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Load particles on page load
document.addEventListener('DOMContentLoaded', () => {
    loadParticles();

    // Handle theme change and reload particles with new color
    document.getElementById("theme-toggle").addEventListener("click", () => {
        setTimeout(() => {
            const canvas = document.querySelector("#particles-js canvas");
            if (canvas) {
                canvas.remove(); // Remove old canvas
            }
            loadParticles(); // Reload with new color
        }, 300); // Increased timeout for smoother transition
    });
}); 