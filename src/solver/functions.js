import Queen from "../classes/Queen";
import Board from "../classes/Board";
let $ = require('jquery');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCost(currentQueens) {
    let h = 0;
    for (let i = 0; i < currentQueens.length; i++) {
        for (let j = i + 1; j < currentQueens.length; j++) {
            if (currentQueens[i].col === currentQueens[j].col
                || currentQueens[i].row === currentQueens[j].row
                || currentQueens[i].leftDiagDiff === currentQueens[j].leftDiagDiff
                || currentQueens[i].rightDiagDiff === currentQueens[j].rightDiagDiff
            ) {
                h += 1;
            }
        }
    }
    return h;
}

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
    if (row >= n) {
        return true;
    }

    for (let i = 0; i < n; i++) {
        if (checkIsSafe(board.queens, row, i)) {
            const newQueen = new Queen(row, i);
            board.queens = [...board.queens, newQueen];

            if (branchOrBound(board, row + 1, n)) {
                return true;
            }

            board.queens = board.queens.filter(q => q.row !== newQueen.row && q.col !== newQueen.col);
        }
    }

    return false;
}

function hillClimbing(board, n) {
    let randomSolution = new Board(8, false);
    let min = getCost(randomSolution.queens);

    let i = 0;

    while (i < 1000 && min > 0) {
        i++;
        let defaultMin = true;
        let localMin = min;

        for (let row = 0; row < n && defaultMin; row++) {
            for (let col = 0; col < n; col++) {
                if(col === randomSolution.queens.find(q => q.row === row).col) {
                    continue;
                }

                let copy = Object.assign({}, randomSolution);
                copy.queens.find(q => q.row === row).col = col;

                let cost = getCost(copy.queens);
                if (min > cost) {
                    randomSolution.queens.find(q => q.row === row).col = col;
                    min = cost;
                    defaultMin = false;
                    break;
                }
            }
        }

        if (localMin === min) {
            randomSolution = new Board(8, false)
        }
    }

    board.queens =  min === 0 ? randomSolution.queens : [];
}

function solve(board, method = 1) {
    board.queens = [];
    switch (method) {
        case 1:
            branchOrBound(board, 0, board.n);
            break;
        case 2:
            hillClimbing(board, board.n);
            break;
    }
}

export {
    checkIsSafe,
    branchOrBound,
    solve,
    getRandomInt
};
