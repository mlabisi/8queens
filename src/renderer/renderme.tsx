let $ = require('jquery');
import Board from "../classes/Board";
let {solve} = require('../solver/functions');

let newBoard = new Board(8);

function toFEN(og) {
    og = og.split('').map(val => parseInt(val) + 1);
    let str = "";
    for(let i = 0; i < 8; i++) {
        str += (og[i] === 1 ? "" : og[i] - 1)
            + "q" + ((8 - og[i]) === 0 ? "" : (8 - og[i]));

        if (i < 7) {
            str += "/";
        }
    }
    return str;
}

$(function () {
    $('form#settingsform').submit(function(e) {
        e.preventDefault();
        switch($(this)[0].elements.mode.value) {
            case "bb":
                solve(newBoard);
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

        // @ts-ignore
        window.board.setPosition(toFEN(newBoard.toString()));
    });
});
