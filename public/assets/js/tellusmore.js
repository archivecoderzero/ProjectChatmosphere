$(document).ready(function () {

    $(document).on("click", "#submit", function (e) {
        e.preventDefault();
        var userData = {
            firstName: $("#firstname").val().trim(),
            lastName: $("#lastname").val().trim(),
            email: $("#email").val().trim(),
            bio: $("#bio").val().trim(),
        }
        console.log(userData);
        updateUser(userData);
    });

    function updateUser(newData) {
        $.ajax({
            method: "PUT",
            url: "/api/tellusmore",
            data: newData
        }).then(function (req, res) {
            console.log(res)
            try { window.location.replace("/home"); }
            catch (e) { window.location = "/home"; }
        })
    }
})