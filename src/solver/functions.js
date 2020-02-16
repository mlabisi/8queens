import Queen from "../classes/Queen";
import Board from "../classes/Board";

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

function crossovers(population, n) {
    for (let i = 0; i < population.length; i += 2) {
        let odds = Math.random() * n;

        for (let j = 0; j < odds; j++) {
            let temp = population[i].queens;
            population[i].queens = population[i + 1].queens;
            population[i + 1].queens = temp;
        }
    }

    return population;
}

function mutate(queens, odds) {
    let vals = [0, 1, 2, 3, 4, 5, 6, 7];
    vals.sort(() => Math.random() - 0.5);

    if (odds >= Math.random()) {
        queens.find(q => q.row === vals[0]).col = vals[1];
    }

    return queens;
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
    let randomState = Board.getRandomState(n);
    let min = getCost(randomState);

    let i = 0;

    while (i < 1000 && min > 0) {
        i++;
        let defaultMin = true;
        let localMin = min;

        for (let row = 0; row < n && defaultMin; row++) {
            for (let col = 0; col < n; col++) {
                if (col === randomState.find(q => q.row === row).col) {
                    continue;
                }

                let copyState = Object.assign([], randomState);
                copyState.find(q => q.row === row).col = col;

                let cost = getCost(copyState);
                if (min > cost) {
                    randomState.find(q => q.row === row).col = col;
                    min = cost;
                    defaultMin = false;
                    break;
                }
            }
        }

        if (localMin === min) {
            randomState = Board.getRandomState(n);
        }
    }

    board.queens = min === 0 ? randomState : [];
}

function genetics(board, n) {
    let popSize = 10;
    let genSize = 50000;
    let odds = 0.75;
    let population = Array.of(Board);
    let maxFitness = n * (n - 1) / 2;

    for (let i = 0; i < popSize; i++) {
        population[i] = new Board(n, false);
    }

    for (let gen = 0; gen < genSize; gen++) {
        population.sort(t => maxFitness - getCost(t.queens));
        population = crossovers(population, n);

        for (let i = 0; i < popSize; i++) {
            if ((maxFitness - getCost(population[i].queens)) === maxFitness) {
                board.queens = population[i].queens;
                return true;
            }

            population[i].queens = mutate(population[i].queens, odds);
            if ((maxFitness - getCost(population[i].queens)) === maxFitness) {
                board.queens = population[i].queens;
                return true;
            }
        }
    }
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
        case 3:
            genetics(board, board.n);
            break;
    }
}

export {
    checkIsSafe,
    branchOrBound,
    solve
};
