let $ = require('jquery');
import Board from "../classes/Board";
import {Chessboard} from 'cm-chessboard';
let {solve} = require('../solver/functions');

let newBoard = new Board(8);

function toFEN(og) {
    return "empty";
}

$(function () {
    $('form#settingsform').submit(function(e) {
        e.preventDefault();
        switch($(this)[0].elements.mode.value) {
            case "bb":
                solve(newBoard);
                console.log($(this));
                break;
            case "hc":
                solve(newBoard);
                break;
            case "an":
                solve(newBoard);
                break;
            default:
                solve(newBoard);
        }
    });
});
