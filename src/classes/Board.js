class Board {
    constructor(n) {
        this.n = n;
        this.queens = [];
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
