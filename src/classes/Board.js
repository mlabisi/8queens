import Queen from "./Queen";

class Board {
    constructor(n, isEmpty = true) {
        this.n = n;
        this.queens = isEmpty ? [] : Board.getRandomState(n);
    }

    toString() {
        let str = "";

        for (let i = 0; i < this.n; i++) {
            str += this.queens[i].col;
        }

        return str;
    }

    static getRandomState(n) {
        let cols = [0, 1, 2, 3, 4, 5, 6, 7];
        let queens = Array.of(Queen);
        cols.sort(() => Math.random() - 0.5);

        for (let i = 0; i < n; i++) {
            queens[i] = new Queen(i, cols[i]);
        }

        return queens;
    }
}

export default Board;
