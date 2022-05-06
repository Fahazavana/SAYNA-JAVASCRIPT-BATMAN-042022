$(document).ready(function() {
    let $win = $(window);
    let $doc = $(document)
    drawLine();
    $win.resize(function() {
        drawLine();
    })

    function drawLine() {
        if ($win.width() > 768) {
            /*hauteur des lignes */
            $('.lLine,.rLine').css("display", "block").animate({ 'height': $doc.height() }, 'slow');
        } else {
            $('.lLine,.rLine').css("display", "none")
        }
    }

    /* scrollbar */
    $win.scroll(function() {
        if ($win.width() > 768) {
            let $posY = $(document).scrollTop()
            $(".scroll").css({ "transform": `translateY(${$posY}px)` })
        }
    });





    /* slider auto */
    let $sliderItem = $(".slider-item");
    let $now = 0;

    $(function() {
        function slide() {
            for (var i = 0; i < $sliderItem.length; i++) {
                $($sliderItem[i]).css('display', 'none')
            }
            $now++;
            ($now > $sliderItem.length) ? ($now = 1) : {};
            $($sliderItem[$now - 1]).css('display', 'block')
        }
        setInterval(slide, 5000)
    })


    /* Media slider */

    let $showSlide = function($n) {
        let $i;
        let $mediaSlider = $(".slider-media");
        if ($n > $mediaSlider.length) { $SlideIndex = 1 };
        if ($n < 1) { $SlideIndex = $mediaSlider.length };
        for ($i = 0; $i < $mediaSlider.length; $i++) {
            $($mediaSlider[$i]).css('display', 'none')
        }
        $($mediaSlider[$SlideIndex - 1]).fadeIn(1500)
    }



    $("#multimedia button.left").click(function(e) {
        e.preventDefault();
        changeSlider(-1)

    });

    $("#multimedia button.right").click(function(e) {
        e.preventDefault();
        changeSlider(1)

    });

    let $SlideIndex = 1;
    $showSlide($SlideIndex)

    function changeSlider($n) {
        $showSlide($SlideIndex += $n)
    }



    /* Apparition au défillement */
    const $options = { root: null, rootMargin: " 0px", threshold: 0.25 }
    const $ratio = 0.25
    const $show = function(entries, $observer) {
        entries.forEach($entry => {
            if ($entry.intersectionRatio > $ratio) {
                $($entry.target).addClass("show").slideDown(3000);
                $observer.unobserve($entry.target);
            }
        });

    }
    const $observer = new IntersectionObserver($show, $options)
    const $scrollShow = $(".scroll-show,.scroll-show > *")
    for (let i = 0; i < $scrollShow.length; i++) {

        $observer.observe($scrollShow[i])
    }

});