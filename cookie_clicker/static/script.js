cookies = 0;



$(function() {
    console.log($('#cookie'));
    $('#cookie').click(function() {
        cookies += 1;
        console.log('asd');
        $('#score').text(cookies);
    });
});
