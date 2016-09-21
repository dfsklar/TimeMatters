
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
    console.log('hello');
    // Ready to construct the boids
    $slate = $('.slate');
    fullAnimDuration = 8;
    for (var i=0; i < 50; i++) {
        left = getRandomIntInclusive(10,200);
        width = getRandomIntInclusive(5,10);
        height = getRandomIntInclusive(5,10);
        animDelay = getRandomIntInclusive(0, 7);
        $inner = $(`<div class="circle" id="cc${i}"></div></div>`);
        $inner.css({
            backgroundColor: 'blue',
            height: `${height}px`,
            width: `${width}px`,
            transformOrigin: 'center 300%',
            animationDuration: '7s',
            animationDelay: `${animDelay}s`
        });
        $outer = $(`<div class="circle-outer" id="c${i}"></div>`);
        $outer.css({
            position: 'absolute',
            left: `${left}px`,
            animation: "updown 4s infinite ease-in-out alternate"
        });
        $inner.appendTo($outer);
        $outer.appendTo($slate);
    }
});
