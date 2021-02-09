$(document).ready(() => {


    $(document).on("click", "#submitSignUpBtn", (event) => {
        event.preventDefault()
        $('.error').empty()

        const username = $('#username').val().trim()
        const first = $('#first_name').val().trim()
        const last = $('#last_name').val().trim()
        const email = $('#email').val().trim()
        const password = $('#password').val().trim()
        const passwordConf = $('#passwordConf').val().trim()
        var validInput = true
        if (!first) { $('#signUpErrorFirstName').append(`<h6 class="error">enter first name</h6>`) }
        else if (!first) { $('#signUpErrorLastName').append(`<h6 class="error">enter last name</h6>`) }
        else if (password.length < 8 || password.length > 16) { validInput = false, $('#signUpErrorPassword').append(`<h6 class="error">password must be 8-16 characters long</h6>`) }
        else if (password !== passwordConf) { validInput = false, $('#signUpErrorConfirmPassword').append(`<h6 class="error">passwords must match</h6>`) }
        else if (validInput, first, last, email) {
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
                if (!data.username) { $('#signUpErrorUsername').empty(), $('#signUpErrorUsername').append(`<h6 class="error">'${username}' already in use</h6>`) }
                if (!data.email) { $('#signUpEmail').append(`<h6 class="error">'${email}' already in use</h6>`) }
                if (data.username && data.email) { location.href = "/" }
            }).fail(err => {
                console.log(err)
            })
        }

    })
});