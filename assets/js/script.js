//  Scroll Trigger ===============================================
$(function () {

    gsap.registerPlugin(ScrollTrigger);

    $(".kv-sec, .kv-2-sec, .kv-3-sec").each(function (i) {

        const section = this;
        const $text = $(section).find(
            ".kv-text-wrap, .kv-2-text-wrap, .kv-3-text-wrap"
        );

        const distance = [1500, 2250, 3000][i];

        gsap.fromTo(
            $text,
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=" + 1500,

                    pin: section,
                    pinSpacing: true,

                    toggleActions: "play reverse play reverse",

                    onEnter: () => {
                        gsap.to($text, {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out"
                        });
                    },

                    onEnterBack: () => {
                        gsap.to($text, {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out"
                        });
                    },

                    onLeaveBack: () => {
                        gsap.set($text, {
                            y: 100,
                            opacity: 0
                        });
                    }
                }
            }
        );

    });

    ScrollTrigger.refresh();

});


// Mission-sec Scroll Trigger ===============================================





// partner slide ===============================================

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