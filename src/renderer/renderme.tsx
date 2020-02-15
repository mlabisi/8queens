let $ = require('jquery');
import Board from "../classes/Board";
import {Chessboard} from 'cm-chessboard';
let {solve} = require('../solver/functions');

let newBoard = new Board(8);
let board;
solve(newBoard);

function toFEN(og) {
    return "start";
}

function generateVisual(rep) {
    let props = {
        position: toFEN(rep), // set as fen, "start" or "empty"
        style: {
            cssClass: "default",
            showCoordinates: false, // show ranks and files
            showBorder: true, // display a border around the board
        }
    };

    board = new Chessboard(document.getElementById("board"), props);
}

$(function () {
    $('form#settingsform').submit(function(e) {
        e.preventDefault();
        if($(this)[0].elements.mode.value == "text") {
            $('#solution').text(newBoard.toString());
            $('#solution').prop('hidden', false);
            $('#board').prop('hidden', true);
        } else {
            $('#solution').prop('hidden', true);
            $('#board').prop('hidden', false);

            if (!board) {
                generateVisual(newBoard.toString());
            }
        }
    });
});
