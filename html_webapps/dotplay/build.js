
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

function getRandomMember(items) {
    return items[Math.floor(Math.random()*items.length)];
}


$(document).ready(function() {
    updownAmounts = ['10','15','20','50'];
    colors = ['green','yellow','red','blue'];
    
    // Ready to construct the boids
    $slate = $('.slate');
    for (var i=0; i < 200; i++) {
        fullAnimDuration = getRandomFloatInclusive(2,3);
        X = getRandomIntInclusive(10,800);
        Y = getRandomIntInclusive(10,30);
        width = getRandomIntInclusive(5,15);
        height = getRandomIntInclusive(5,13);
        animDelay = getRandomFloatInclusive(0, fullAnimDuration);

        // . c i r c l e  (the innermost)
        $inner = $(`<div class="circle" id="cc${i}"></div></div>`);
        $inner.css({
            backgroundColor: getRandomMember(colors),
            height: `${height}px`,
            width: `${width}px`,
            left: `-${width/2}px`,
            top: `-${height/2}px`,
            animation: `animcircle ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`
        });

        // . c i r c l e - o u t e r
        yVar = getRandomMember(updownAmounts);
        $outer = $(`<div class="circle-outer" id="c${i}"></div>`);
        $outer.css({
            position: 'absolute',
            left: `${X}px`,
            animation: `updown${yVar} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay}s`
        });

        $inner.appendTo($outer);
        $outer.appendTo($slate);
    }
});
