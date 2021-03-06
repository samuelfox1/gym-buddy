
$(document).ready(() => {
    $('.sidenav').sidenav();

    $(document).on('click', ".home", () => { $('main').fadeOut(() => { location.href = "/" }) })

    $(document).on('click', '.logout', () => {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/logout'
        }).then(data => {
            location.href = "/"
        }).fail(err => { console.log(err) })
    })


    $(document).on("click", "#signUpBtn", (e) => {
        e.preventDefault()
        $('#homeWindow').slideUp('slow', () => {
            $('#signUpWindow').slideDown('slow')
        })
    })


    $(document).on("click", "#signInBtn", (e) => {
        e.preventDefault()
        $('#homeWindow').slideUp('slow', () => {
            $("#loginWindow").slideDown('slow')

        })
    })


    $(document).on('click', '#addRoutineBtn', (e) => {
        e.preventDefault()
        const input = $('#newRoutine')
        if (input) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/api/routine/new',
                data: { title: input.val().trim() }
            }).then(data => { input.val(''), getAllRoutines() })
                .fail(err => { console.log(err) })
        }
    })


    function getAllRoutines() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/routine'
        }).then(data => {
            $('#savedRoutines').empty()
            const routines = data.routines
            if (routines.length === 0) {
                $('#savedRoutines').append(`<li>Please add a routine to start</li>`)
            } else {
                routines.forEach(x => {
                    $('#savedRoutines').append(`<li><a id="userRoutine" data-id="${x._id}">${x.title}</a></li>`)
                });
            }
        }).fail(err => { console.log(err) })
    }


    $(document).on('click', '#userRoutine', function () {
        const id = $(this).data('id')
        getSelectedRoutine(id)
    })

    function getSelectedRoutine(x) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: `/api/routine/${x}`,
        }).then(data => {
            $('#allRoutineWindow').fadeOut(() => {
                $('#selectedRoutineTitle').val(`${data.title}`)
                $('#selectedRoutineTitle').attr('data-id', data._id)
                $('#savedExercises').empty()

                const exercises = data.exercises
                if (exercises.length === 0) {
                    $('#savedExercises').append(`<li>Please add an exercise to start</li>`)
                } else {
                    exercises.forEach(x => {
                        $('#savedExercises').append(
                            `<li>
                            <a id="userExercise" data-id="${x._id}">${x.title}</a>
                            <ul style="display:none">
                            <hr>
                            <li>Type: ${x.type}</li>
                            <li>Weight: ${x.weight}</li>
                            <li>Sets: ${x.sets}</li>
                            <li>Reps: ${x.reps}</li>
                            <li>Duration: ${x.duration} mins</li>
                            <hr>
                            </ul>
                            </li>`
                        )
                    });
                }

                $('#selectedRoutineWindow').fadeIn()
            })
        }).fail(err => { console.log(err) })
    }


    $(document).on('click', '#selectedRoutineEditTitle', function () {
        //toggle the 'disabled' property for the text input
        $('#selectedRoutineTitle').prop('disabled', (_, val) => !val)

        if ($(this).text() === "create") { $(this).text('save') }
        else {
            const title = $('#selectedRoutineTitle').val()
            const id = $('#selectedRoutineTitle').data('id')

            const type = 'PUT'
            const url = `/api/routine/${id}`
            const data = { title }
            ajaxCall(type, url, data)

            $(this).text('create')
        }
    })


    function ajaxCall(type, url, data) {
        $.ajax({
            type: type,
            dataType: 'json',
            url: url,
            data: data
        }).then(data => { console.log(data) })
            .fail(err => { console.log(err) })
    }

    $(document).on('click', '#selectedRoutineDelete', function () {
        const id = $('#selectedRoutineTitle').data('id')
        const type = 'DELETE'
        const url = `/api/routine/${id}`
        const data = null
        ajaxCall(type, url, data)
        $('#selectedRoutineWindow').fadeOut(() => {
            loadSession()
        })


    })



    $(document).on('click', '#userExercise', function () {
        $(this).next().slideToggle('slow')
    })


    $(document).on('click', '#addExerciseForm', function () {
        toggleAddExerciseForm()
    })


    $(document).on('click', '#submitExerciseBtn', function (event) {
        event.preventDefault()

        const exercise = {
            id: $('#selectedRoutineTitle').data('id'),
            title: $('#addExerciseTitle').val().trim(),
            type: $('#addExerciseType').val().trim(),
            weight: parseInt($('#addExerciseWeight').val().trim()),
            sets: parseInt($('#addExerciseSets').val().trim()),
            reps: parseInt($('#addExerciseReps').val().trim()),
            duration: parseInt($('#addExerciseDuration').val().trim()),
            // cardio: $('#cardioCheckbox').val(),
            distance: $('#addExerciseDistance').val().trim()
        }
        addExercise(exercise)
        toggleAddExerciseForm()
    })

    function toggleAddExerciseForm() {
        $('#exerciseForm').slideToggle('slow', () => {
            let icon = $('#addExerciseIcon')
            if (icon.text() === 'arrow_downward') { icon.text('arrow_upward') }
            else { icon.text('arrow_downward') }
        })
    }

    function addExercise(x) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/api/exercise',
            data: x
        }).then(data => { getSelectedRoutine(x.id) })
            .fail(err => { console.log(err) })
    }


    function loadSession() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/session'
        }).then(data => {
            if (data) {
                // $('#messageBoard').empty()
                // $('#messageBoard').prepend(`<h5>welcome, ${data.first_name}</h5>`)
                // $('#messageBoard').fadeIn('slow')
                $('#routineTitle').text(`${data.first_name}'s Routines`)
                $('#allRoutineWindow').fadeIn('slow')
                getAllRoutines()
            } else {
                $('#messageBoard').empty()
                $('#messageBoard').prepend(`<h5>please login or sign up</h5>`)
                $('#messageBoard').fadeIn('slow')
                $('#homeWindow').fadeIn('slow')
            }
        }).fail(err => { console.log(err) })
    }

    loadSession()
})