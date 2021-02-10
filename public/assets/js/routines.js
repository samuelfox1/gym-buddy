
$(document).ready(() => {

    $(document).on('click', '#userRoutine', function () {
        const id = $(this).data('id')
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: `/api/routine/${id}`,
            data: id
        }).then(data => {
            console.log(data.title)
            $('#allRoutineWindow').fadeOut(x => {
                $('#selectedRoutineTitle').text(`${data.title}`)
                $('#selectedRoutineWindow').fadeIn('slow')
            })
        })
            .fail(err => { console.log(err) })
    })

    $(document).on('click', '#addExerciseBtn', function () {
        $('#exerciseForm').slideToggle('slow')
    })




})