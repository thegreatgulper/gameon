document.addEventListener('DOMContentLoaded', () => {
    const colors = [
        '#ff0000', '#ff0000',
        '#00ff00', '#00ff00',
        '#0000ff', '#0000ff',
        '#ffff00', '#ffff00',
        '#ff00ff', '#ff00ff',
        '#00ffff', '#00ffff',
        '#ff8800', '#ff8800',
        '#8800ff', '#8800ff'
    ];

    const grid = document.querySelector('.grid');
    const restartBtn = document.querySelector('#restart');
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
        const shuffledColors = shuffle(colors);
        grid.innerHTML = '';
        matchedPairs = 0;
        
        shuffledColors.forEach((color, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.color = color;
            card.dataset.index = index;
            card.style.backgroundColor = '#ddd';
            
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length === 2) return;
        if (flippedCards.includes(this)) return;

        this.style.backgroundColor = this.dataset.color;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.color === card2.dataset.color) {
            matchedPairs++;
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            if (matchedPairs === 8) {
                alert('Congratulations! You won!');
            }
        } else {
            card1.style.backgroundColor = '#ddd';
            card2.style.backgroundColor = '#ddd';
        }
        flippedCards = [];
    }

    restartBtn.addEventListener('click', createBoard);
    createBoard();
});