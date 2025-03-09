// Dark mode functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Guard clause if button doesn't exist
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Apply theme on initial load
    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        // Update particles color when theme changes
        if (typeof updateParticlesColor === 'function') {
            updateParticlesColor(isDark);
        }
    }
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved theme or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme(true);
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDarkMode); 