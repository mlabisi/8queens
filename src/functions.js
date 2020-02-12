import Queen from "./classes/Queen";

function checkIsSafe(currentQueens, row, col) {
    const newQueen = new Queen(row, col);

    for (let i = 0; i < currentQueens.length; i++) {
        const currentQueen = currentQueens[i];

        if (currentQueen &&
            (currentQueen.col === newQueen.col
                || currentQueen.row === newQueen.row
                || currentQueen.leftDiagDiff === newQueen.leftDiagDiff
                || currentQueen.rightDiagDiff === newQueen.rightDiagDiff
            )) {
            return false;
        }
    }

    return true;
}

function branchOrBound(board, row, n) {
    if (row >= n) {return true;}

    for (let i = 0; i < n; i++) {
        if (checkIsSafe(board.queens, row, i)) {
            const newQueen = new Queen(row, i);
            board.queens = [...board.queens, newQueen];

            if(branchOrBound(board, row + 1, n)) {
                return true;
            }

            board.queens = board.queens.filter(q => q.row !== newQueen.row && q.col !== newQueen.col);
        }
    }

    return false;
}

function solve(board) {
    if (branchOrBound(board, 0, board.n) !== false) {
        console.log(board.toString());
        return board.toString();
    }

    return false;
}

export {
    checkIsSafe,
    branchOrBound,
    solve
};
