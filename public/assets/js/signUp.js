$(document).ready(() => {


    $(document).on("click", "#submitSignUpBtn", (event) => {
        event.preventDefault()

        const username = $('#username').val().trim()
        const first = $('#first_name').val().trim()
        const last = $('#last_name').val().trim()
        const email = $('#email').val().trim()
        const password = $('#password').val().trim()
        const passwordConf = $('#passwordConf').val().trim()

        if (password.length >= 8 && password.length <= 16 && password === passwordConf) {
            if (first, last, email) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '/signUp',
                    data: {
                        username: username,
                        first_name: first,
                        last_name: last,
                        email: email,
                        password: password
                    }
                }).then(data => {
                    console.log(data)
                    if (data) {
                        location.href = "/"
                    } else {
                        $('#usernameAlreadyInUse').removeClass('hide')
                    }
                }).fail(err => {
                    console.log(err)
                })
            }
        } else {
            console.log(false)
            $('#signUpErrorMessage').removeClass('hide')
        }
    })
});