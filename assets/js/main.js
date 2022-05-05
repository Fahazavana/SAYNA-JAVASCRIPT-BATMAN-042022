$(document).ready(function() {
    let $win = $(window);
    let $doc = $(document)
    $('.lLine,.rLine').animate({ 'height': $doc.height() }, 2000);

    $win.scroll(function() {
        let $posY = $(document).scrollTop()
        $(".scroll").css({ "transform": `translateY(${$posY}px)` })
    });
});