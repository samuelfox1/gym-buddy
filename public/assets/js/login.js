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
                    $('#loginFail').removeClass('hide')
                } else {
                    location.href = `/`
                    console.log(data)
                }
            })
        }
    })

})