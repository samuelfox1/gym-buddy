const doc = $(document)
doc.ready(() => {
    $('.sidenav').sidenav();

    doc.on('click', ".home", () => { $('main').fadeOut(() => { location.href = "/" }) })

    doc.on('click', '.logout', () => {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/logout'
        }).then(data => {
            location.href = "/"
        }).fail(err => { console.log(err) })
    })


    doc.on("click", "#signUpBtn", (e) => {
        e.preventDefault()
        $('#homeWindow').slideUp('slow', () => {
            $('#signUpWindow').slideDown('slow')
        })
    })


    doc.on("click", "#signInBtn", (e) => {
        e.preventDefault()
        $('#homeWindow').slideUp('slow', () => {
            $("#loginWindow").slideDown('slow')

        })
    })


    doc.on('click', '#addRoutineBtn', (e) => {
        e.preventDefault()
        const input = $('#newRoutine').val().trim()
        if (input) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/api/routine/new',
                data: { title: input }
            }).then(data => { getRoutines() })
                .fail(err => { console.log(err) })
        }
    })



    function getRoutines() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/routine'
        }).then(data => {
            $('#savedRoutines').empty()
            const routines = data[0].routines
            routines.forEach(x => {
                console.log(x)
                $('#savedRoutines').append(`<li><a id="userRoutine" data-id="${x._id}">${x.title}</a></li>`)
            });
        }).fail(err => { console.log(err) })
    }




    // Call api/session to retrieve active session data if a user is logged in
    function loadSession() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/session'
        }).then(data => {
            if (data) {
                $('#messageBoard').prepend(`<h5>welcome, ${data.first_name}</h5>`)
                $('#messageBoard').fadeIn('slow')
                $('#allRoutineWindow').fadeIn('slow')
                getRoutines()
            } else {
                $('#messageBoard').prepend(`<h5>please login or sign up</h5>`)
                $('#messageBoard').fadeIn('slow')
                $('#homeWindow').fadeIn('slow')
            }
        }).fail(err => { console.log(err) })
    }

    loadSession()
})