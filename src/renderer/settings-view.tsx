let $ = require('jquery');

$(function () {
    $('form#settingsform').submit(function(e) {
        e.preventDefault();
        console.log($(this).serializeArray());
    });
});

