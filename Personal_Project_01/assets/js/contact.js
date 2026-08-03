$(function () {
    $(".contact-btn").on("click", function (e) {
        e.preventDefault();

        const form = $(".contact-form")[0];

        if (form.checkValidity()) {
            alert("문의가 완료되었습니다.");
            form.reset();
        } else {
            form.reportValidity();
        }
    });
});