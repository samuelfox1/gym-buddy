$(document).ready(() => {

    $(document).on('click', '#submitLoginBtn', (event) => {
        event.preventDefault()

        const username = $('#loginUsername').val().trim()
        const password = $('#loginPassword').val().trim()

        if (username, password) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/login',
                data: {
                    username: username,
                    password: password
                }
            }).then(data => {
                if (!data) {
                    $('#LoginLabelUsername').addClass('error').text('Wrong Username or Password')
                } else {
                    $("#loginWindow").fadeOut('slow', () => { location.href = `/` })
                }
            }).fail(err => { console.log(err) })
        }
    })

})