const gameContainer = document.getElementById('gameContainer');
const playerTurn = document.getElementById('playerTurn');
const timerElement = document.getElementById('timer');
const expandButton = document.getElementById('expandButton');
const resetButton = document.getElementById('resetButton');
const timeLimit = 10;

let gridSize = 3;
let currentPlayer = 'X';
let timer;
let timeLeft = timeLimit;
let board;

const resetTimer = () => {
    clearTimeout(timer);
    timeLeft = timeLimit;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearTimeout(timer);
            alert(`Player ${currentPlayer} ran out of time! \n\nPlayer ${currentPlayer === 'X' ? 'O' : 'X'} wins!`);
            restartGame(); 
        }
    }, 1000);
};

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = `${currentPlayer}`;
    resetTimer();
}

const checkWin = () => {
    const lines = [];

    for (let i = 0; i < gridSize; i++) {
        lines.push(board[i]);
        lines.push(board.map(row => row[i]));
    }

    lines.push(board.map((row, i) => row[i]));
    lines.push(board.map((row, i) => row[gridSize - 1 - i]));

    for (const line of lines) {
        if (line.every(cell => cell === currentPlayer)) {
            alert(`Player ${currentPlayer} wins!`);
            restartGame();
            return true;
        }
    }

    if (board.flat().every(cell => cell !== '')) {
        alert('It\'s a draw!');
        restartGame();
        return true;
    }

    return false;
};


const renderBoard = () => {
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameContainer.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = board[row][col] || '';
            cell.addEventListener('click', () => {
                if (board[row][col] === '') {
                    board[row][col] = currentPlayer;
                    cell.textContent = currentPlayer;
                    if (!checkWin()) {
                        switchPlayer();
                    }
                }
            });
            gameContainer.appendChild(cell);
        }
    }

    playerTurn.textContent = `${currentPlayer}`;
    resetTimer();
};

const expandGrid = (size) => {
    if (size >= 3 && size <= 5) {
        const newBoard = Array(size).fill().map(() => Array(size).fill(''));
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                newBoard[row][col] = board[row][col];
            }
        }
        board = newBoard;
        gridSize = size;
        renderBoard();
    }
};

function restartGame() {
    gridSize = 3;
    board = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
    renderBoard();
}

resetButton.addEventListener('click', restartGame);

board = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
renderBoard();
