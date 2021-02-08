$(document).ready(() => {
    const doc = $(document)

    $('.sidenav').sidenav();


    doc.on('click', ".home", () => {
        $('main').fadeOut(() => {
            location.href = "/"
        })
    })

    doc.on('click', '.logout', () => {

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



    function loadSession() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'api/session'
        }).then(data => {
            if (data) {
                console.log(data, "true")
                $('#messageBoard').prepend(`<h5>welcome, ${data.first_name}</h5>`)
                $('#messageBoard').fadeIn('slow')
            } else {
                console.log(data, "false")
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