console.log('linked!')

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
// });

// Or with jQuery

$(document).ready(function () {
    $('.sidenav').sidenav();
});


$(document).on("click", "#signUpBtn", (event) => {
    event.preventDefault()
    $('#landingWindow').toggleClass('hide')
    $('#signUpWindow').toggleClass('hide')
})