// Initialisation des variables
let board;
let currentPlayer;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Fonction pour initialiser le jeu
function initGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    renderBoard();
}

// Fonction pour rendre la grille
function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.classList.remove('winner');
    });
    checkWinner();
}

// Fonction pour gérer les clics sur les cases
function handleCellClick(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        renderBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Fonction pour vérifier les gagnants
function checkWinner() {
    let winner = null;
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            combination.forEach(index => {
                document.querySelectorAll('.cell')[index].classList.add('winner');
            });
        }
    });

    if (winner) {
        setTimeout(() => alert(`Le joueur ${winner} a gagné!`), 10);
        setTimeout(initGame, 2000);
    } else if (!board.includes(null)) {
        setTimeout(() => alert("Match nul!"), 10);
        setTimeout(initGame, 2000);
    }
}

// Ajout des écouteurs d'événements
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
});
// Fonction pour réinitialiser le jeu
function resetGame() {
    initGame();
}
// Ajout de la fonctionnalité de redémarrage du jeu
document.getElementById('restart').addEventListener('click', () => {
    if (confirm("Voulez-vous vraiment redémarrer le jeu ?")) {
        initGame();
    }
});
