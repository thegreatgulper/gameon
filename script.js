const colors = [
    '#FF0000', '#FF0000',
    '#00FF00', '#00FF00',
    '#0000FF', '#0000FF',
    '#FFFF00', '#FFFF00',
    '#FF00FF', '#FF00FF',
    '#00FFFF', '#00FFFF',
    '#FFA500', '#FFA500',
    '#800080', '#800080'
];

let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    const shuffledColors = shuffle([...colors]);

    shuffledColors.forEach((color, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length >= 2) return;
    if (this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.style.backgroundColor = this.dataset.color;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === 8) {
            alert('Congratulations! You won!');
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundColor = '#ccc';
        card2.style.backgroundColor = '#ccc';
    }
    flippedCards = [];
}

function restartGame() {
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
}

document.getElementById('restart').addEventListener('click', restartGame);

// Initialize the game
createBoard();