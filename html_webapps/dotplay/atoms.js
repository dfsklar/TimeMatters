"use strict";

window.templ_hadron = `<div class="hadron"><div class="quark upq upleft"></div><div class="quark upq upright"></div><div class="quark downq down"></div></div>`;

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


function build_particles(qty) {
    var $slate = $('.slate');
    var maxy_to_x_ratio = 0.10;
    var colors = COLORS;
    for (var i=0; i < 200; i++) {
        var X = triangular(30, 2000, 150);
        // Y_int = Math.round(getRandomFloatInclusive(1, X*maxy_to_x_ratio));
        var Y_int = Math.round(X * maxy_to_x_ratio);   // Y is the "radius" of the simulated rotation around the X axis
        var rate_of_speed =     (getRandomFloatInclusive(1, 1.5) + Math.pow(2, -Y_int)) * 18;
        //console.log(Y_int);
        //console.log(rate_of_speed);
        var fullAnimDuration = (2*Y_int) / rate_of_speed;
        var width = 2 * getRandomIntInclusive(3,6); // must be even number to avoid "clipped-circle" look
        var height = width;
        var animDelay = 0; //getRandomFloatInclusive(0, fullAnimDuration);
        var animStyle = Math.min(200, getRandomIntInclusive(1, Y_int));

        var $inner = $(`<div class="circle" id="cc${i}"></div></div>`);
        $inner.css({
            zIndex: getRandomIntInclusive(1, 50),
            position: 'absolute',
            backgroundColor: getRandomMember(colors),
            height: `${height}px`,
            width: `${width}px`,
            left: `${X-width/2}px`,
            topfiejow: `${0-height/2}px`,
            animation: `cycle${animStyle} ${fullAnimDuration}s infinite alternate ease-in-out`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`
        });
        $inner.appendTo($slate);
    }
}





// ANIMATION: a simple quiver-in-place, with the duration varying randomly
// SIZE: hardwired constant, source of truth is CSS
function build_hadrons(qty, Xleft, Xdens, Xright, YmaxL, YmaxR) {
    var $slate = $('.slate');
    var Xbase = Xleft;
    for (var i=0; i < qty; i++) {
        var fullAnimDuration = getRandomFloatInclusive(3,8);
        var X = triangular(Xleft, Xright, Xdens);
        var Ymax = YmaxL + (YmaxR-YmaxL)/(X-Xleft);
        var Y = getRandomFloatInclusive(-Ymax, Ymax);
        var width = 25;  // hardwired for now, must match css spec
        var height = width;

        // NO NEED FOR A "HOLDER" DIV
        var $hadron = $(window.templ_hadron);

        var animDelay = getRandomFloatInclusive(0, fullAnimDuration);
        var animStyle = getRandomIntInclusive(0, 9);

        $hadron.css({
            position: 'absolute',
            opacity: 1,
            left: `${X-width/2}px`,
            top: `${Y-height/2}px`,
            animationxxx: `throbinplace${animStyle} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`,
            zIndex: getRandomIntInclusive(1, 50)
        });

        $hadron.appendTo($slate);
    }
}


function build_atoms(qty, Xleft, Xdens, Xright, YmaxL, YmaxR) {
    var $slate = $('.slate');
    var Xbase = Xleft;
    for (var i=0; i < qty; i++) {
        var fullAnimDuration = getRandomFloatInclusive(3,8);
        var child_count = (i%2) ? 1 : 2;
        var X = triangular(Xleft, Xright, Xdens);
        var Ymax = YmaxL + (YmaxR-YmaxL)/(X-Xleft);
        var Y = getRandomFloatInclusive(-Ymax, Ymax);
        var width = 41;  // hardwired for now, must match css spec
        var height = width;

        var $atom = $(`<div class='atom childcount${child_count}'></div>`);
        for (var childidx = 0; childidx < child_count; childidx++) {
            var $h = $(window.templ_hadron);
            $h.addClass(`h${childidx}`);
            $h.appendTo($atom);
        }

        var animDelay = getRandomFloatInclusive(0, fullAnimDuration);
        var animStyle = getRandomIntInclusive(0, 9);

        $atom.css({
            position: 'absolute',
            opacity: 1,
            left: `${X-width/2}px`,
            top: `${Y-height/2}px`,
            animationXXX: `throbinplace${animStyle} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`,
            zIndex: getRandomIntInclusive(1, 50)
        });

        $atom.appendTo($slate);
    }
}
