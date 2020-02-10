class Queen {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    get leftDiagDiff() {
        return this.row - this.col;
    }

    get rightDiagDiff() {
        return this.row + this.col;
    }
}

export default Queen;
