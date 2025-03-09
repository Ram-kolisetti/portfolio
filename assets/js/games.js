// Game Modal Functionality
const gameModal = document.getElementById('gameModal');
const instructionsModal = document.getElementById('instructionsModal');
const closeButtons = document.querySelectorAll('.close-modal');

// Store game state variables
let currentGameLoop = null;
let currentGameEventListeners = [];

// Function to remove event listeners
function removeGameEventListeners() {
    currentGameEventListeners.forEach(listener => {
        document.removeEventListener('keydown', listener);
    });
    currentGameEventListeners = [];
}

// Function to stop current game
function stopCurrentGame() {
    if (currentGameLoop) {
        clearInterval(currentGameLoop);
        currentGameLoop = null;
    }
    removeGameEventListeners();
}

// Close modals when clicking close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        stopCurrentGame();
        gameModal.classList.remove('active');
        instructionsModal.classList.remove('active');
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === gameModal) {
        stopCurrentGame();
        gameModal.classList.remove('active');
    }
    if (e.target === instructionsModal) {
        instructionsModal.classList.remove('active');
    }
});

// Game Instructions
const gameInstructions = {
  memory: {
    title: 'Memory Game Instructions',
    content: `
      <h4>How to Play:</h4>
      <ol>
        <li>Click on any card to flip it</li>
        <li>Try to find matching pairs of cards</li>
        <li>You can only flip two cards at a time</li>
        <li>If the cards match, they stay face up</li>
        <li>If the cards don't match, they flip back face down</li>
        <li>Complete the game by matching all pairs</li>
        <li>Try to finish in the fewest moves possible!</li>
      </ol>
      <h4>Controls:</h4>
      <ul>
        <li>Mouse click to flip cards</li>
        <li>Press 'R' to restart the game</li>
      </ul>
    `
  },
  snake: {
    title: 'Snake Game Instructions',
    content: `
      <h4>How to Play:</h4>
      <ol>
        <li>Use arrow keys to control the snake</li>
        <li>Eat the food to grow longer</li>
        <li>Avoid hitting the walls</li>
        <li>Avoid hitting your own tail</li>
        <li>Try to get the highest score!</li>
      </ol>
      <h4>Controls:</h4>
      <ul>
        <li>↑ Up arrow to move up</li>
        <li>↓ Down arrow to move down</li>
        <li>← Left arrow to move left</li>
        <li>→ Right arrow to move right</li>
        <li>Space to pause/resume</li>
        <li>R to restart</li>
      </ul>
    `
  },
  tetris: {
    title: 'Tetris Game Instructions',
    content: `
      <h4>How to Play:</h4>
      <ol>
        <li>Arrange falling blocks to create complete lines</li>
        <li>When a line is complete, it disappears</li>
        <li>Score points for each line cleared</li>
        <li>Game ends when blocks reach the top</li>
        <li>Try to get the highest score!</li>
      </ol>
      <h4>Controls:</h4>
      <ul>
        <li>← Left arrow to move left</li>
        <li>→ Right arrow to move right</li>
        <li>↓ Down arrow to move down faster</li>
        <li>↑ Up arrow to rotate block</li>
        <li>Space to drop block instantly</li>
        <li>P to pause/resume</li>
        <li>R to restart</li>
      </ul>
    `
  }
};

// Show game instructions
function showGameInstructions(game) {
  const instructions = gameInstructions[game];
  document.getElementById('instructionsTitle').textContent = instructions.title;
  document.getElementById('instructionsContent').innerHTML = instructions.content;
  instructionsModal.classList.add('active');
}

// Game Functions
function startMemoryGame() {
  gameModal.classList.add('active');
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = `
    <canvas id="memoryCanvas"></canvas>
    <div class="game-stats">
      <span>Moves: <span id="moves">0</span></span>
      <button onclick="restartMemoryGame()">Restart</button>
    </div>
  `;
  initMemoryGame();
}

function startSnakeGame() {
  gameModal.classList.add('active');
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = `
    <canvas id="snakeCanvas"></canvas>
    <div class="game-stats">
      <span>Score: <span id="score">0</span></span>
      <button onclick="restartSnakeGame()">Restart</button>
    </div>
  `;
  initSnakeGame();
}

function startTetrisGame() {
  gameModal.classList.add('active');
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = `
    <canvas id="tetrisCanvas"></canvas>
    <div class="game-stats">
      <span>Score: <span id="score">0</span></span>
      <span>Level: <span id="level">1</span></span>
      <button onclick="restartTetrisGame()">Restart</button>
    </div>
  `;
  initTetrisGame();
}

// Memory Game Implementation
function initMemoryGame() {
  stopCurrentGame(); // Stop any existing game
  const canvas = document.getElementById('memoryCanvas');
  const ctx = canvas.getContext('2d');
  // Set canvas size
  canvas.width = 600;
  canvas.height = 400;
  
  // Game state
  let cards = [];
  let flippedCards = [];
  let moves = 0;
  let matchedPairs = 0;
  
  // Initialize cards
  const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎟️', '🎠'];
  const cardPairs = [...emojis, ...emojis];
  shuffleArray(cardPairs);
  
  // Create card objects
  cards = cardPairs.map((emoji, index) => ({
    emoji,
    x: (index % 4) * 140 + 40,
    y: Math.floor(index / 4) * 100 + 40,
    width: 120,
    height: 80,
    isFlipped: false,
    isMatched: false
  }));
  
  // Draw initial state
  drawMemoryGame();
  
  // Add click event listener
  const clickHandler = handleMemoryClick;
  canvas.addEventListener('click', clickHandler);
  currentGameEventListeners.push(clickHandler);
  
  function handleMemoryClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedCard = cards.find(card => 
      !card.isMatched && 
      !card.isFlipped && 
      x >= card.x && 
      x <= card.x + card.width && 
      y >= card.y && 
      y <= card.y + card.height
    );
    
    if (clickedCard) {
      flipCard(clickedCard);
    }
  }
  
  function flipCard(card) {
    card.isFlipped = true;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
      moves++;
      document.getElementById('moves').textContent = moves;
      checkMatch();
    }
    
    // Animate the card flip
    let startTime = null;
    const duration = 600; // 600ms for flip animation
    
    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const scale = ease(progress);
      
      // Apply scale transform to card
      ctx.save();
      ctx.translate(card.x + card.width/2, card.y + card.height/2);
      ctx.scale(scale, 1);
      ctx.translate(-(card.x + card.width/2), -(card.y + card.height/2));
      
      // Draw the card with current state
      ctx.fillStyle = card.isMatched ? '#4CAF50' : 
                     card.isFlipped ? '#2196F3' : '#FFC107';
      ctx.fillRect(card.x, card.y, card.width, card.height);
      
      if (card.isFlipped || card.isMatched) {
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(card.emoji, card.x + card.width/2, card.y + card.height/2);
      }
      
      ctx.restore();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.emoji === card2.emoji) {
      card1.isMatched = true;
      card2.isMatched = true;
      matchedPairs++;
      
      if (matchedPairs === emojis.length) {
        setTimeout(() => {
          alert(`Congratulations! You won in ${moves} moves!`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        drawMemoryGame();
      }, 1000);
    }
    
    flippedCards = [];
  }
  
  function drawMemoryGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    cards.forEach(card => {
      // Draw card background
      ctx.fillStyle = card.isMatched ? '#4CAF50' : 
                     card.isFlipped ? '#2196F3' : '#FFC107';
      ctx.fillRect(card.x, card.y, card.width, card.height);
      
      // Draw card content without rotation
      if (card.isFlipped || card.isMatched) {
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(card.emoji, card.x + card.width/2, card.y + card.height/2);
      }
    });
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

// Snake Game Implementation
function initSnakeGame() {
  stopCurrentGame(); // Stop any existing game
  const canvas = document.getElementById('snakeCanvas');
  const ctx = canvas.getContext('2d');
  // Set canvas size
  canvas.width = 600;
  canvas.height = 400;
  
  // Game state
  let snake = [{x: 10, y: 10}];
  let food = generateFood();
  let direction = 'right';
  let score = 0;
  let isPaused = false;
  
  // Start game loop
  currentGameLoop = setInterval(updateSnakeGame, 100);
  
  // Add keyboard controls
  const keyPressHandler = handleSnakeKeyPress;
  document.addEventListener('keydown', keyPressHandler);
  currentGameEventListeners.push(keyPressHandler);
  
  function handleSnakeKeyPress(e) {
    switch(e.key) {
      case 'ArrowUp':
        if (direction !== 'down') direction = 'up';
        break;
      case 'ArrowDown':
        if (direction !== 'up') direction = 'down';
        break;
      case 'ArrowLeft':
        if (direction !== 'right') direction = 'left';
        break;
      case 'ArrowRight':
        if (direction !== 'left') direction = 'right';
        break;
      case ' ':
        isPaused = !isPaused;
        break;
      case 'r':
      case 'R':
        restartSnakeGame();
        break;
    }
  }
  
  function updateSnakeGame() {
    if (isPaused) return;
    
    const head = {...snake[0]};
    
    switch(direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }
    
    // Check collision with walls
    if (head.x < 0 || head.x >= canvas.width / 20 ||
        head.y < 0 || head.y >= canvas.height / 20) {
      gameOver();
      return;
    }
    
    // Check collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      gameOver();
      return;
    }
    
    snake.unshift(head);
    
    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      document.getElementById('score').textContent = score;
      food = generateFood();
    } else {
      snake.pop();
    }
    
    drawSnakeGame();
  }
  
  function drawSnakeGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });
    
    // Draw food
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
  }
  
  function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / 20));
    const y = Math.floor(Math.random() * (canvas.height / 20));
    return {x, y};
  }
  
  function gameOver() {
    clearInterval(currentGameLoop);
    alert(`Game Over! Score: ${score}`);
    restartSnakeGame();
  }
}

// Tetris Game Implementation
function initTetrisGame() {
  stopCurrentGame(); // Stop any existing game
  const canvas = document.getElementById('tetrisCanvas');
  const ctx = canvas.getContext('2d');
  // Set canvas size
  canvas.width = 300;
  canvas.height = 600;
  
  // Game state
  let grid = Array(20).fill().map(() => Array(10).fill(0));
  let currentPiece = null;
  let currentX = 0;
  let currentY = 0;
  let score = 0;
  let level = 1;
  let isPaused = false;
  let currentColor = '';
  let lastDropTime = 0;
  let dropInterval = 1000;
  
  // Tetris pieces with colors
  const pieces = [
    { shape: [[1,1,1,1]], color: '#00f0f0' }, // I
    { shape: [[1,1], [1,1]], color: '#f0f000' }, // O
    { shape: [[1,1,1], [0,1,0]], color: '#a000f0' }, // T
    { shape: [[1,1,1], [1,0,0]], color: '#f0a000' }, // L
    { shape: [[1,1,1], [0,0,1]], color: '#0000f0' }, // J
    { shape: [[1,1,0], [0,1,1]], color: '#00f000' }, // S
    { shape: [[0,1,1], [1,1,0]], color: '#f00000' }  // Z
  ];
  
  // Start game loop
  currentGameLoop = setInterval(updateTetrisGame, 16);
  
  // Add keyboard controls
  const keyPressHandler = handleTetrisKeyPress;
  document.addEventListener('keydown', keyPressHandler);
  currentGameEventListeners.push(keyPressHandler);
  
  // Spawn first piece
  spawnPiece();
  
  function handleTetrisKeyPress(e) {
    if (isPaused) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        movePiece(0, 1);
        break;
      case 'ArrowUp':
        rotatePiece();
        break;
      case ' ':
        dropPiece();
        break;
      case 'p':
      case 'P':
        isPaused = !isPaused;
        break;
      case 'r':
      case 'R':
        restartTetrisGame();
        break;
    }
  }
  
  function spawnPiece() {
    const pieceIndex = Math.floor(Math.random() * pieces.length);
    currentPiece = pieces[pieceIndex].shape;
    currentColor = pieces[pieceIndex].color;
    currentX = Math.floor((10 - currentPiece[0].length) / 2);
    currentY = 0;
    
    if (!isValidMove(currentX, currentY)) {
      gameOver();
    }
  }
  
  function isValidMove(x, y) {
    for (let row = 0; row < currentPiece.length; row++) {
      for (let col = 0; col < currentPiece[row].length; col++) {
        if (currentPiece[row][col]) {
          const newX = x + col;
          const newY = y + row;
          
          if (newX < 0 || newX >= 10 || newY >= 20 ||
              (newY >= 0 && grid[newY][newX])) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  function movePiece(dx, dy) {
    const newX = currentX + dx;
    const newY = currentY + dy;
    
    if (isValidMove(newX, newY)) {
      currentX = newX;
      currentY = newY;
      return true;
    }
    return false;
  }
  
  function rotatePiece() {
    const rotated = currentPiece[0].map((_, i) =>
      currentPiece.map(row => row[i]).reverse()
    );
    
    const originalPiece = currentPiece;
    currentPiece = rotated;
    
    // Try to adjust position if rotation causes collision
    if (!isValidMove(currentX, currentY)) {
      // Try moving left
      if (isValidMove(currentX - 1, currentY)) {
        currentX--;
      }
      // Try moving right
      else if (isValidMove(currentX + 1, currentY)) {
        currentX++;
      }
      // If still invalid, revert rotation
      else {
        currentPiece = originalPiece;
      }
    }
  }
  
  function dropPiece() {
    while (movePiece(0, 1));
    lockPiece();
  }
  
  function lockPiece() {
    for (let row = 0; row < currentPiece.length; row++) {
      for (let col = 0; col < currentPiece[row].length; col++) {
        if (currentPiece[row][col]) {
          grid[currentY + row][currentX + col] = currentColor;
        }
      }
    }
    
    checkLines();
    spawnPiece();
  }
  
  function checkLines() {
    let linesCleared = 0;
    
    for (let row = 19; row >= 0; row--) {
      if (grid[row].every(cell => cell !== 0)) {
        grid.splice(row, 1);
        grid.unshift(Array(10).fill(0));
        linesCleared++;
        row++;
      }
    }
    
    if (linesCleared > 0) {
      // Score calculation based on number of lines cleared
      const points = [0, 100, 300, 500, 800]; // Points for 0, 1, 2, 3, 4 lines
      score += points[linesCleared] * level;
      document.getElementById('score').textContent = score;
      
      // Level up every 1000 points
      const newLevel = Math.floor(score / 1000) + 1;
      if (newLevel > level) {
        level = newLevel;
        document.getElementById('level').textContent = level;
        dropInterval = Math.max(100, 1000 - (level - 1) * 100); // Faster as level increases
      }
    }
  }
  
  function updateTetrisGame() {
    if (isPaused) return;
    
    const currentTime = Date.now();
    if (currentTime - lastDropTime > dropInterval) {
      if (!movePiece(0, 1)) {
        lockPiece();
      }
      lastDropTime = currentTime;
    }
    
    drawTetrisGame();
  }
  
  function drawTetrisGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (grid[row][col]) {
          ctx.fillStyle = grid[row][col];
          ctx.fillRect(col * 30, row * 30, 29, 29);
          
          // Add grid lines
          ctx.strokeStyle = 'rgba(0,0,0,0.1)';
          ctx.strokeRect(col * 30, row * 30, 30, 30);
        }
      }
    }
    
    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = currentColor;
      for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
          if (currentPiece[row][col]) {
            ctx.fillRect(
              (currentX + col) * 30,
              (currentY + row) * 30,
              29,
              29
            );
          }
        }
      }
    }
  }
  
  function gameOver() {
    clearInterval(currentGameLoop);
    alert(`Game Over! Score: ${score}`);
    restartTetrisGame();
  }
}

// Restart functions
function restartMemoryGame() {
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = '';
  startMemoryGame();
}

function restartSnakeGame() {
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = '';
  startSnakeGame();
}

function restartTetrisGame() {
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = '';
  startTetrisGame();
} 