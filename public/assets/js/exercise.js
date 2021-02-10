$(document).ready(function () {


    // $(document).on('click', '#cardioCheckbox', () => {
    //     console.log('checked')
    // })
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
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/api/exercise',
            data: exercise
        }).then(data => { console.log(data) })
            .fail(err => { console.log(err) })
    })

})