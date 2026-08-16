// kv 섹션 ==============================================================

gsap.registerPlugin(ScrollTrigger);

$(function () {

    const $s = $(".kv-sec"),
        $t = $s.children("h2"),
        $i = $(".kv-img-wrap"),
        $c = $s.find(".kv-content");

    if (!$s.length || !$t.length || !$i.length || $c.length < 2) return;

    gsap.set($i, {
        transformOrigin: "center center",
        zIndex: 1,
        "--overlay-opacity": 0
    });

    gsap.set($c, {
        position: "fixed",
        top: "50%",
        left: 0,
        width: "100%",
        xPercent: 0,
        yPercent: -50,
        autoAlpha: 0,
        y: 100
    });

    let w, h, x, y;

    const pos = () => {
        const r = $i[0].getBoundingClientRect();

        w = r.width;
        h = r.height;
        x = innerWidth / 2 - (r.left + r.width / 2);
        y = innerHeight / 2 - (r.top + r.height / 2);
    };

    pos();

    gsap.timeline({
        scrollTrigger: {
            trigger: $t[0],
            start: "top top",
            end: "+=5000",
            pin: $s[0],
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
                pos();
                gsap.set($i, { zIndex: 10 });
            },
            onEnterBack: () => {
                pos();
                gsap.set($i, { zIndex: 10 });
            },
            onLeaveBack: () => {
                gsap.set($i, {
                    zIndex: 1,
                    "--overlay-opacity": 0
                });
            }
        }
    })

        .to($t, {
            y: () => -innerHeight,
            duration: 1.5,
            ease: "none"
        }, 0)

        .to($i, {
            scaleX: () => innerWidth / w,
            scaleY: () => innerHeight / h,
            x: () => x,
            y: () => y,
            borderRadius: 0,
            duration: 1.5,
            ease: "none"
        }, 0)

        .to($i, {
            "--overlay-opacity": 1,
            duration: .4,
            ease: "none"
        })

        .to({}, {
            duration: 1
        })

        .to($c.eq(0), {
            autoAlpha: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        })

        .to({}, {
            duration: 1.2
        })

        .to($c.eq(0), {
            autoAlpha: 0,
            y: -80,
            duration: 1.2,
            ease: "power2.inOut"
        })

        .fromTo($c.eq(1),
            {
                autoAlpha: 0,
                y: 100
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1.8,
                ease: "power2.out"
            }
        )

        .to({}, {
            duration: 1.5
        });

    $(window).on("resize", () => {
        pos();
        ScrollTrigger.refresh();
    });

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


// 카운트업 ==============================================================

gsap.registerPlugin(ScrollTrigger);

$(function () {

    $(".stats-sec").each(function () {

        const $sec = $(this);
        const $counts = $sec.find(".count-up");

        gsap.to($counts, {
            duration: 0.5,
            ease: "none",

            scrollTrigger: {
                trigger: $sec[0],
                start: "bottom bottom",
                once: true,

                onEnter: () => {

                    $counts.each(function () {

                        const $count = $(this);
                        const target = parseFloat($count.data("count"));

                        gsap.to($count, {
                            textContent: target,
                            duration: 0.5,
                            ease: "none",
                            snap: {
                                textContent: target % 1 ? 0.1 : 1
                            },
                            onUpdate: function () {
                                const value = parseFloat($count.text());

                                $count.text(
                                    target % 1
                                        ? value.toFixed(1)
                                        : Math.round(value)
                                );
                            }
                        });

                    });

                }
            }
        });

    });

});


// 연혁 ==============================================================

gsap.registerPlugin(ScrollTrigger);

$(function () {

    $(".history-item").each(function () {

        const $item = $(this);

        gsap.fromTo($item,
            {
                opacity: 0,
                x: $item.hasClass("history-item-right") ? 100 : -100
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: this,
                    start: "bottom bottom",
                    toggleActions: "play none none reverse"
                }
            }
        );

    });

});