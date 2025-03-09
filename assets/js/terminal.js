// Terminal commands and their responses
const commands = {
    'help': 'Available commands:\n- help: Show this help message\n- about: Learn about me\n- skills: View my skills\n- contact: Get my contact information\n- clear: Clear the terminal\n- exit: Close the terminal',
    'about': 'Hi! I\'m Ram Kolisetti, a Full-Stack Web Developer and IoT Developer. I love creating innovative solutions and building amazing web applications.',
    'skills': 'My skills include:\n- Frontend Development (HTML, CSS, JavaScript)\n- Backend Development\n- IoT Development\n- Full Stack Development\n- Problem Solving\n- Team Collaboration',
    'contact': 'You can reach me at:\n- Email: kolisettiramkumar5@gmail.com\n- LinkedIn: https://www.linkedin.com/in/ram-kolisetti-53a49a326/\n- GitHub: https://github.com/Ram-Kolisetti',
    'clear': () => {
        term.clear();
        return '';
    },
    'exit': () => {
        closeTerminal();
        return '';
    }
};

// Create bubbles container
function createBubbles() {
    const bubblesContainer = document.createElement('div');
    bubblesContainer.className = 'terminal-bubbles';
    terminalContainer.appendChild(bubblesContainer);

    // Create multiple bubbles
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'terminal-bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${2 + Math.random() * 3}s`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        bubble.style.opacity = `${0.1 + Math.random() * 0.2}`;
        bubblesContainer.appendChild(bubble);
    }
}

// Initialize terminal
const term = new Terminal({
    cursorBlink: true,
    theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selection: '#264f78',
        black: '#000000',
        red: '#ff0000',
        green: '#00ff00',
        yellow: '#ffff00',
        blue: '#0000ff',
        magenta: '#ff00ff',
        cyan: '#00ffff',
        white: '#ffffff',
        brightBlack: '#808080',
        brightRed: '#ff0000',
        brightGreen: '#00ff00',
        brightYellow: '#ffff00',
        brightBlue: '#0000ff',
        brightMagenta: '#ff00ff',
        brightCyan: '#00ffff',
        brightWhite: '#ffffff'
    },
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    fontSize: 14,
    lineHeight: 1.2,
    cursorStyle: 'block',
    allowTransparency: true
});

// Terminal elements
const terminalContainer = document.getElementById('terminal-container');
const terminalToggle = document.getElementById('terminal-toggle');
const closeTerminalBtn = document.getElementById('close-terminal');
const terminalElement = document.getElementById('terminal');

// Initialize terminal
term.open(terminalElement);

// Create bubbles when terminal is initialized
createBubbles();

// Welcome message
const welcomeMessage = 'Welcome to Ram Kolisetti\'s Portfolio Terminal!\nType "help" to see available commands.\n\n$ ';
let currentChar = 0;

function typeMessage(message, callback) {
    if (currentChar < message.length) {
        term.write(message[currentChar]);
        currentChar++;
        setTimeout(() => typeMessage(message, callback), 30);
    } else if (callback) {
        callback();
    }
}

// Handle terminal input
term.onData(e => {
    switch (e) {
        case '\r': // Enter
            const command = term._core.buffer.active.getLine(term._core.buffer.active.cursorY).translateToString().trim();
            const args = command.split(' ').slice(1);
            const cmd = command.split(' ')[0].toLowerCase();
            
            term.write('\r\n');
            
            if (commands[cmd]) {
                const response = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
                if (response) {
                    // Type out the response with animation
                    let responseChar = 0;
                    const typeResponse = () => {
                        if (responseChar < response.length) {
                            term.write(response[responseChar]);
                            responseChar++;
                            setTimeout(typeResponse, 20);
                        } else {
                            term.write('\r\n$ ');
                        }
                    };
                    typeResponse();
                }
            } else {
                term.write(`Command not found: ${cmd}\r\n$ `);
            }
            break;
        case '\u007f': // Backspace
            if (term._core.buffer.active.cursorX > 2) {
                term.write('\b \b');
            }
            break;
        default:
            term.write(e);
    }
});

// Toggle terminal visibility with animation
terminalToggle.addEventListener('click', () => {
    terminalContainer.classList.add('active');
    // Reset cursor position and clear any previous input
    term.clear();
    currentChar = 0;
    typeMessage(welcomeMessage);
});

// Close terminal with animation
closeTerminalBtn.addEventListener('click', () => {
    terminalContainer.classList.remove('active');
});

// Close terminal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalContainer.classList.contains('active')) {
        terminalContainer.classList.remove('active');
    }
});

// Add terminal toggle button animation
terminalToggle.addEventListener('mouseenter', () => {
    terminalToggle.style.transform = 'scale(1.1)';
});

terminalToggle.addEventListener('mouseleave', () => {
    terminalToggle.style.transform = 'scale(1)';
}); 