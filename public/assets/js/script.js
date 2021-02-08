$(document).ready(() => {
    $('.sidenav').sidenav();

    $(document).on("click", "#signUpBtn", (event) => {
        event.preventDefault()
        $('#landingWindow').slideUp('slow')
        $('#signUpWindow').fadeIn()
    })

    $(document).on('click', ".home", () => {
        $('main').fadeOut(() => {
            location.href = "/"
        })
    })

    $(document).on("click", "#signInBtn", (event) => {
        event.preventDefault()
        $('#landingWindow').slideUp('slow')
        $("#loginWindow").fadeIn('hide')
    })

    $('main').fadeIn('slow')
})