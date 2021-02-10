$(document).ready(() => {


    $(document).on("click", "#submitSignUpBtn", (event) => {
        event.preventDefault()
        // $('.error').empty()

        const username = $('#signUpUsername').val().trim()
        const first = $('#signUpFirst_name').val().trim()
        const last = $('#signUpLast_name').val().trim()
        const email = $('#signUpEmail').val().trim()
        const password = $('#signUpPassword').val().trim()
        const passwordConf = $('#signUpPasswordConf').val().trim()
        var validInput = true
        if (!first) { $('#signUpLabelFirstName').addClass('error').text('First Name') }
        if (!last) { $('#signUpLabelLastName').addClass('error').text('Last Name') }
        if (!username) { $('#signUpLabelUsername').addClass('error').text('Username') }
        if (!email) { $('#signUpLabelEmail').addClass('error').text('Email') }
        if (password.length < 8 || password.length > 16) { validInput = false, $('#signUpLabelPassword').addClass('error').text('Password must be 8-16 characters long') }
        if (password !== passwordConf) { validInput = false, $('#signUpLabelConfirmPassword').addClass('error') }
        else if (validInput && first && last && email && password === passwordConf) {
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
                if (!data.username) { $('#signUpLabelUsername').addClass('error'), $('#signUpLabelUsername').text(`'${username}' already in use`) }
                if (!data.email) { $('#signUpLabelEmail').addClass('error'), $('#signUpLabelEmail').text(`'${email}' already in use`) }
                if (data.username && data.email) { location.href = "/" }
            }).fail(err => {
                console.log(err)
            })
        }

    })
});