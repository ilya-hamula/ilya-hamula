$(function() {
    $('.checkbox-container input[type="checkbox"]').on('click', function() {
        if ( $('#on-1').prop('checked') ) {
            $('.map').children('.blue').css('display', 'block');
        } else $('.map').children('.blue').css('display', 'none');

        if ( $('#on-2').prop('checked') ) {
            $('.map').children('.red').css('display', 'block');
        } else $('.map').children('.red').css('display', 'none');

        if ( $('#on-3').prop('checked') ) {
            $('.map').children('.green').css('display', 'block');
        } else $('.map').children('.green').css('display', 'none');
    });
});