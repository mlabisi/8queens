let $ = require('jquery');
import Board from "../classes/Board";
let {solve} = require('../solver/functions');

let newBoard = new Board(8);

function toFEN(og) {
    return "start";
}

$(function () {
    $('form#settingsform').submit(function(e) {
        e.preventDefault();
        switch($(this)[0].elements.mode.value) {
            case "bb":
                solve(newBoard);
                // @ts-ignore
                window.board.setPosition(toFEN(newBoard.toString()));
                break;
            case "hc":
                solve(newBoard);
                // @ts-ignore
                window.board.setPosition(toFEN(newBoard.toString()));
                break;
            case "an":
                solve(newBoard);
                // @ts-ignore
                window.board.setPosition(toFEN(newBoard.toString()));
                break;
            default:
                solve(newBoard);
                // @ts-ignore
                window.board.setPosition(toFEN(newBoard.toString()));
        }
    });
});
