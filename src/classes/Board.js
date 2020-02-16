import Queen from "./Queen";

class Board {
    constructor(n, isEmpty = true) {
        this.n = n;
        this.queens = [];

        if (isEmpty === false) {
            let cols = [0, 1, 2, 3, 4, 5, 6, 7];
            cols.sort(() => Math.random() - 0.5);

            for (let i = 0; i < n; i++) {
                this.queens[i] = new Queen(i, cols[i]);
            }
        }
    }

    toString() {
        let str = "";

        for (let i = 0; i < this.n; i++) {
            str += this.queens[i].col;
        }

        return str;
    }
}

export default Board;
