$(document).ready(function() {
    console.log('hello');
    // Ready to construct the boids
    $slate = $('.slate');
    for (var i=0; i < 50; i++) {
        $slate.append(`<div class="circle-outer" id="c${i}"><div class="circle green" id="cc${i}"></div></div>`);
    }
});
