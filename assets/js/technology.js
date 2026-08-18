// Mobile-menu =================================================

$(function () {

    const $menu = $(".mobile-menu");
    const $icon = $(".hamburger-menu img");

    // 페이지 로드 시 무조건 숨김
    $menu.hide();

    $(".hamburger-menu").on("click", function () {

        if ($menu.is(":hidden")) {

            $menu.stop(true, true).slideDown(400);

        } else {

            $menu.stop(true, true).slideUp(400);

            $icon.attr(
                "src",
                "/assets/images/icon-hamburger-menu.svg"
            );
        }

    });

});


