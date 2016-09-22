
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomFloatInclusive(min, max) {
  return (Math.random() * (max - min + 1)) + min;
}



$(document).ready(function() {
    console.log('hello');
    // Ready to construct the boids
    $slate = $('.slate');
    for (var i=0; i < 50; i++) {
        fullAnimDuration = getRandomFloatInclusive(2,3);
        X = getRandomIntInclusive(10,400);
        Y = getRandomIntInclusive(10,30);
        width = getRandomIntInclusive(5,15);
        height = getRandomIntInclusive(5,13);
        animDelay = getRandomFloatInclusive(0, fullAnimDuration);

        // . c i r c l e  (the innermost)
        $inner = $(`<div class="circle" id="cc${i}"></div></div>`);
        $inner.css({
            backgroundColor: 'blue',
            height: `${height}px`,
            width: `${width}px`,
            animationDuration: `${fullAnimDuration}s`,
            animationDelay: `${animDelay+(fullAnimDuration/4)}s`
        });

        $outer = $(`<div class="circle-outer" id="c${i}"></div>`);
        $outer.css({
            position: 'absolute',
            left: `${X}px`,
            animation: `updown ${fullAnimDuration/2.0}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay}s`
        });

        $inner.appendTo($outer);
        $outer.appendTo($slate);
    }
});
