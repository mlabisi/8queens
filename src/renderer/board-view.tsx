import Board from "../classes/Board";
let {solve} = require('../solver/functions');
let $ = require('jquery');

let newBoard = new Board(8);
solve(newBoard);

$('#solutionbtn').on('click', () => {
    $('#solution').text(newBoard.toString())
});
