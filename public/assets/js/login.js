$(document).ready(function () {
    $('#login-signup #links a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');

        // Show/Hide Tabs
        $('#login-signup ' + currentAttrValue).fadeIn(1000).siblings().hide();

        // Change/remove current tab to active
        $(this).parent('li').addClass('active bg-white -mb-2').siblings().removeClass('active bg-white -mb-2');

        e.preventDefault();
    });
});