var spareRandom = null;

function normalRandom()
{
	var val, u, v, s, mul;

	if(spareRandom !== null)
	{
		val = spareRandom;
		spareRandom = null;
	}
	else
	{
		do
		{
			u = Math.random()*2-1;
			v = Math.random()*2-1;

			s = u*u+v*v;
		} while(s === 0 || s >= 1);

		mul = Math.sqrt(-2 * Math.log(s) / s);

		val = u * mul;
		spareRandom = v * mul;
	}
	
	return val / 14;	// 7 standard deviations on either side
}


function normalRandomInRange(min, max)
{
	var val;
	do
	{
		val = normalRandom();
	} while(val < min || val > max);
	
	return val;
}

function normalRandomScaled(mean, stddev)
{
	var r = normalRandomInRange(-1, 1);

	r = r * stddev + mean;

	return Math.round(r);
}

function lnRandomScaled(gmean, gstddev)
{
	var r = normalRandomInRange(-1, 1);

	r = r * Math.log(gstddev) + Math.log(gmean);

	return Math.round(Math.exp(r));
}


function toNearestFive(val) {
    return 5 * (1 + Math.floor(val / 5));
}



var COLORS = [
    '#7c9262',
    '#f9a86b',
    '#fed5a7',
    '#7ebea2',
    '#c7b2d6',
    '#9b6791',
    '#463060',
    '#766a8c',
    '#b7d39d',
    '#90ca6d',
    '#c19287',
    '#e07553',
    '#006e8d',
    '#64aaba',
    '#2673b6',
    '#7ad0e2',
    '#a8444a',
    '#b4666a',
    '#0087ce',
    '#008fba'
];



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
    colors = COLORS;
    
    // Leftmost portion
    $slate = $('.slate');
    for (var i=0; i < 100; i++) {
        fullAnimDuration = getRandomFloatInclusive(2,3);
        X = lnRandomScaled(40, 1.0);
        console.log(`X = ${X}`);
        Y = Math.floor(X * 0.8) + 1;
        width = getRandomIntInclusive(5,8);
        height = width;
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
        yVar = 77;
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
