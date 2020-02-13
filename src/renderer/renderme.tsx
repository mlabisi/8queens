let $ = require('jquery');
import Board from "../classes/Board";
let {solve} = require('../solver/functions');

let newBoard = new Board(8);
solve(newBoard);

$(function () {
    $('form#settingsform').submit(function(e) {
        e.preventDefault();
        if($(this)[0].elements.mode.value == "text") {
                $('#solution').text(newBoard.toString())
        } else {
                $('#solution').text("Picture here")
        }
    });
});



