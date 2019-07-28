$(window).on('load', function () {
    window.location.hash = '';
    $(window).scrollTop("#section1");
});

$(document).ready(function () {
    $('#login-signup #links a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');

        // Show/Hide Tabs
        $('#login-signup ' + currentAttrValue).fadeIn(1000).siblings().hide();

        // Change/remove current tab to active
        $(this).parent('li').addClass('active bg-white -mb-2').siblings().removeClass('active bg-white -mb-2');

        e.preventDefault();
    });

    $("#scroll-button").click(function () {
        console.log("click");
        $(window).scrollTop($('#section2').offset().top)
    });

    $(window).scroll(function () {
        $(".lefty").each(function (i, el) {
            var el = $(el);
            if (el.is(':in-viewport')) {
                el.addClass("slide-in-blurred-left");
                el.removeClass("invisible")
            } else {
                el.removeClass("slide-in-blurred-left")
                el.addClass("invisible")
            }
        });
        $(".righty").each(function (i, el) {
            var el = $(el);
            if (el.is(':in-viewport')) {
                el.addClass("slide-in-blurred-right");
                el.removeClass("invisible")
            } else {
                el.removeClass("slide-in-blurred-right")
                el.addClass("invisible")
            }
        });
    });

});