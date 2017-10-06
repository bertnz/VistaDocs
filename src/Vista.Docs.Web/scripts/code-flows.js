$(function () {
    $(".call-flow-title").on("click",function(c) {
        $(this).next('.flow-diagram').toggle();
    });
});