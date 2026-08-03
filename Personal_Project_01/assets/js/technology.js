gsap.registerPlugin(ScrollTrigger);

const items = gsap.utils.toArray(".step-item");
const images = gsap.utils.toArray(".step-img");
const list = document.querySelector(".step-list");

const itemHeight = 240;
const total = items.length;

let current = 0;

// =============================
// 초기 상태
// =============================

gsap.set(images, {
    autoAlpha: 0
});

gsap.set(images[0], {
    autoAlpha: 1
});

items.forEach((item, i) => {
    item.classList.toggle("active", i === 0);
});

// 첫 번째가 가운데 오도록 시작 위치
gsap.set(list, {
    y: 240
});

// =============================
// active 변경
// =============================

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

// =============================
// Timeline
// =============================

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".step-sec",
        start: "top top",
        end: "+=" + (total * 1200),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // markers: true
    }
});

// 첫 번째 유지
tl.to({}, {
    duration: 1
});

// 02 ~ 06
for (let i = 1; i < total; i++) {

    tl.to(list, {
        y: 240 - (itemHeight * i),
        duration: 1,
        ease: "none",
        onStart: () => changeStep(i),
        onReverseComplete: () => changeStep(i - 1)
    });

}