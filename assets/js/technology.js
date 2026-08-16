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


gsap.registerPlugin(ScrollTrigger);

$(function () {

    /* ==========================================================
            KV SECTION
    ========================================================== */

    const $section = $(".kv-sec");
    const $heroText = $section.find(".kv-text-wrap");
    const $video = $section.find(".kv-img-wrap");
    const $nextText = $section.find(".kv-2-title-wrap");

    if (!$section.length || !$heroText.length || !$video.length || !$nextText.length) return;


    gsap.set($section, {
        position: "relative",
        zIndex: 100
    });

    gsap.set($section.next(), {
        position: "relative",
        zIndex: 1
    });

    gsap.set($video, {
        transformOrigin: "center center",
        zIndex: 10
    });

    gsap.set($heroText, {
        zIndex: 20
    });

    gsap.set($nextText, {
        autoAlpha: 0,
        y: 100
    });


    /* =========================
            VIDEO POSITION
    ========================= */

    let videoW, videoH, moveX, moveY;

    function setVideoPosition() {

        const r = $video[0].getBoundingClientRect();

        videoW = r.width;
        videoH = r.height;

        moveX = innerWidth / 2 - (r.left + r.width / 2);
        moveY = innerHeight / 2 - (r.top + r.height / 2);
    }

    setVideoPosition();


    /* =========================
            KV TIMELINE
    ========================= */

    gsap.timeline({
        scrollTrigger: {
            trigger: $section[0],
            start: "top top",
            end: "+=6000",

            pin: true,
            pinSpacing: true,

            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onEnter: setVideoPosition,
            onEnterBack: setVideoPosition
        }
    })

        .to($heroText, {
            y: () => -innerHeight,
            autoAlpha: 0,
            duration: 1.5,
            ease: "none"
        })

        .to($video, {
            scaleX: () => innerWidth / videoW,
            scaleY: () => innerHeight / videoH,
            x: () => moveX,
            y: () => moveY,
            borderRadius: 0,
            duration: 1.5,
            ease: "none"
        }, "<")

        .to({}, {
            duration: 1.5
        })

        .to($nextText, {
            autoAlpha: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        })

        .to({}, {
            duration: 2
        });


    /* ==========================================================
            STEP SECTION
    ========================================================== */

    const items = gsap.utils.toArray(".step-item");
    const images = gsap.utils.toArray(".step-img");
    const list = document.querySelector(".step-list");

    if (!items.length || !images.length || !list) return;


    /* =========================
            RESPONSIVE VALUE
    ========================= */

    let itemHeight;
    let scrollDistance;

    function setStepSize() {

        itemHeight = items[0].getBoundingClientRect().height;

        /*
            PC 기준 1200px을 기준으로
            화면이 작아지면 비율에 맞게 감소
        */
        scrollDistance = Math.max(
            700,
            Math.min(
                1200,
                1200 * (innerWidth / 1920)
            )
        );
    }

    setStepSize();


    const total = items.length;
    let current = 0;


    /* =========================
            INITIAL
    ========================= */

    gsap.set(images, {
        autoAlpha: 0
    });

    gsap.set(images[0], {
        autoAlpha: 1
    });

    items.forEach((item, i) => {
        item.classList.toggle("active", i === 0);
    });

    gsap.set(list, {
        y: itemHeight
    });


    /* =========================
            ACTIVE CHANGE
    ========================= */

    function changeStep(index) {

        if (current === index) return;

        items[current].classList.remove("active");
        items[index].classList.add("active");

        gsap.to(images[current], {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
        });

        gsap.to(images[index], {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
        });

        current = index;
    }


    /* =========================
            STEP TIMELINE
    ========================= */

    const stepTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".step-sec",
            start: "top top",
            end: () => "+=" + (total * scrollDistance),

            pin: true,
            pinSpacing: true,

            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });


    /* 첫 번째 유지 */

    stepTl.to({}, {
        duration: 1
    });


    /* 02 ~ 마지막 */

    for (let i = 1; i < total; i++) {

        stepTl.to(list, {
            y: () => itemHeight - (itemHeight * i),

            duration: 1,
            ease: "none",

            onStart: () => changeStep(i),
            onReverseComplete: () => changeStep(i - 1)
        });

    }


    /* =========================
            RESIZE
    ========================= */

    $(window).on("resize", function () {

        setVideoPosition();
        setStepSize();

        gsap.set(list, {
            y: itemHeight
        });

        ScrollTrigger.refresh();

    });

});