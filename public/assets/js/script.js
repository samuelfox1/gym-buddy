$(document).ready(() => {
    const doc = $(document)

    $('.sidenav').sidenav();


    doc.on('click', ".home", () => {
        $('main').fadeOut(() => {
            location.href = "/"
        })
    })

    doc.on('click', '.logout', () => {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/logout'
        }).then(data => {
            $('main').fadeOut('slow', () => {
                location.href = "/"
            })
        }).fail(err => {
            console.log(err)
        })
    })


    doc.on("click", "#signUpBtn", (event) => {
        event.preventDefault()
        $('#landingWindow').slideUp('slow', () => {
            $('#signUpWindow').slideDown('slow')
        })
    })

    doc.on("click", "#signInBtn", (event) => {
        event.preventDefault()
        $('#landingWindow').slideUp('slow', () => {
            $("#loginWindow").slideDown('slow')

        })
    })


    // Call api/session to retrieve active session data if a user is logged in
    function loadSession() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'api/session'
        }).then(data => {
            if (data) {
                $('#messageBoard').prepend(`<h5>welcome, ${data.first_name}</h5>`)
                $('#messageBoard').fadeIn('slow')
            } else {
                $('#messageBoard').prepend(`<h5>please login or sign up</h5>`)
                $('#messageBoard').fadeIn('slow')
                $('main').fadeIn('slow')
            }
        }).fail(err => {
            console.log(err)
        })
    }

    loadSession()
})