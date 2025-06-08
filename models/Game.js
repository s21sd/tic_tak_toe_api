const v4 = require('uuid').v4;

class Game {
    constructor() {
        this.id = v4();
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.isDraw = false;

    }

    makeMove(position) {
        if (this.winner || this.board[position] || this.isDraw) {
            return false;
        }

        // User Move = X 
        this.board[position] = this.currentPlayer;
        this.checkGameStatus();

        if (this.winner || this.isDraw) return true;

        // Computer Move = O
        this.currentPlayer = 'O';
        this.makebotMove();

        return true;
    }

    makebotMove() {
        const emptyCells = this.board
            .map((val, index) => (val == null ? index : null))
            .filter((v) => v != null);

        if (emptyCells.length === 0) return;

        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.board[randomMove] = this.currentPlayer;
        this.checkGameStatus();
        this.currentPlayer = 'X';
    }

    checkGameStatus() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let [a, b, c] of winningCombinations) {
            if (
                this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                this.winner = this.board[a];
                return;
            }
        }

        if (!this.board.includes(null)) {
            this.isDraw = true;
        }
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.isDraw = false;
    }
}

module.exports = Game;
