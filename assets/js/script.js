$(function () {

    const $wrap = $(".partner-wrap");
    const $items = $wrap.find("img");

    // 원본 이미지 세트 복제
    $items.clone().appendTo($wrap);

    let x = 0;
    const speed = 1;

    // 원본 6개 세트의 실제 전체 너비 계산
    let setWidth = 0;

    $items.each(function () {
        setWidth += $(this).outerWidth(true);
    });

    function animate() {

        x -= speed;

        // 원본 세트 하나가 완전히 지나가면
        // 위치를 같은 거리만큼 되돌려 자연스럽게 반복
        if (Math.abs(x) >= setWidth) {
            x += setWidth;
        }

        $wrap.css(
            "transform",
            `translate3d(${x}px, 0, 0)`
        );

        requestAnimationFrame(animate);
    }

    animate();

});