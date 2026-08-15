$(function () {

    const $wrap = $(".partner-wrap");
    const $items = $wrap.find("img");
    const speed = 1;

    $items.clone().appendTo($wrap);

    let x = 0;
    const setWidth = $items.toArray().reduce((sum, el) => {
        return sum + $(el).outerWidth(true);
    }, 0);

    function move() {
        x -= speed;

        if (Math.abs(x) >= setWidth) {
            x += setWidth;
        }

        $wrap.css("transform", `translateX(${x}px)`);
        requestAnimationFrame(move);
    }

    move();

});





$(function () {

    $(".hamburger-menu").on("click", function () {

        const $menu = $(".mobile-menu");
        const $icon = $(this).find("img");

        if ($menu.is(":visible")) {

            $menu.stop(true, true).slideUp(400);

        } else {

            $menu
                .stop(true, true)
                .hide()
                .slideDown(400);

        }

    });

});