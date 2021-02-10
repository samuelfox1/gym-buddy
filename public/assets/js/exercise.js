$(document).ready(function () {


    // $(document).on('click', '#cardioCheckbox', () => {
    //     console.log('checked')
    // })
    $(document).on('click', '#submitExerciseBtn', function (event) {
        event.preventDefault()
        const title = $('#addExerciseTitle').val().trim()
        const type = $('#addExerciseType').val().trim()
        const weight = $('#addExerciseWeight').val().trim()
        const sets = $('#addExerciseSets').val().trim()
        const reps = $('#addExerciseReps').val().trim()
        const duration = $('#addExerciseDuration').val().trim()
        const cardio = $('#cardioCheckbox').val()
        const distance = $('#addExerciseDistance').val().trim()
        const exercise = {
            title: title,
            type: type,
            weight: weight,
            sets: sets,
            reps: reps,
            duration: duration,
            cardio: cardio,
            distance: distance
        }
        console.log(exercise)
    })

})