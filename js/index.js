document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const newGameButton = document.getElementById('newGameButton');
    let emptyPosition = 15;

    function createBoard() {
        const numbers = [];
        for (let i = 1; i <= 15; i++) {
          numbers.push(i);
        }        numbers.push('');

        shuffle(numbers);

        board.innerHTML = '';
        numbers.forEach((number, index) => {
            const button = document.createElement('button');
            button.textContent = number;
            button.classList.add(number === '' ? 'empty' : 'number');
            button.addEventListener('click', () => moveTile(index));
            board.appendChild(button);
        });

        emptyPosition = numbers.indexOf('');
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function moveTile(index) {
        const buttons = Array.from(board.children);
        const emptyButton = buttons[emptyPosition];
        const targetButton = buttons[index];

        const validMoves = [
            emptyPosition - 4,
            emptyPosition + 4,
            emptyPosition - 1,
            emptyPosition + 1
        ];

        if (validMoves.includes(index)) {
            emptyButton.textContent = targetButton.textContent;
            emptyButton.classList.remove('empty');
            targetButton.textContent = '';
            targetButton.classList.add('empty');
            emptyPosition = index;
        }
    }

    newGameButton.addEventListener('click', createBoard);

    createBoard();
});