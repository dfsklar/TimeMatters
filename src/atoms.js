"use strict";

window.matter_templates = {
    'hadron': `<div class="hadron"><div class="quark upq upleft"></div><div class="quark upq upright"></div><div class="quark downq down"></div></div>`,
    'dense1': `<div class="densematt dense1"></div>`,
    'dense2': `<div class="densematt dense2"></div>`,
    'black':  `<div class="densematt blackhole"></div>`,
    'white':  `<div class="densematt egg"></div>`,

    'atom1':  `<div class='atom childcount1'></div>`,
    'atom2':  `<div class='atom childcount2'></div>`
};



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


function build_particles(Wmin, Wmax, qty, Xleft, Xdens, Xright, YmaxL, YmaxR) {
    var $slate = $('.slate');
    var colors = COLORS;
    for (var i=0; i < qty; i++) {
        var X = (Xright > Xleft) ? triangular(Xleft, Xright, Xdens) : Xleft;
        var Ymax = (X > Xleft) ? (YmaxL + (YmaxR-YmaxL)*(X-Xleft)/(Xright-Xleft)) : YmaxL;
        var Y = Ymax;   //(Ymax > 0) ? getRandomFloatInclusive(0, Ymax) : 10;
        var width = getRandomFloatInclusive(Wmin, Wmax);
        var height = width;
        var fullAnimDuration = Math.min(Ymax / 80, 3) * getRandomFloatInclusive(0.99,1.01);
        if (false) {
            console.log('------');
            console.log(Xleft);
            console.log(X);
            console.log(Xright);
            console.log('. . . .');
            console.log(YmaxL);
            console.log(Ymax);
            console.log(YmaxR);
            console.log('. . . .');
            console.log(Y);
            console.log(Y_int);
            console.log(rate_of_speed);
        }
        var width = 2 * Math.round(getRandomFloatInclusive(Wmin/2.0, Wmax/2.0)); // must be even number to avoid "clipped-circle" look
        var height = width;
        var animDelay = 0; //getRandomFloatInclusive(0, fullAnimDuration);
        var animStyle = Math.min(window.Ymax, Math.round(Y));

        var $inner = $(`<div class="circle" id="cc${i}"></div></div>`);
        $inner.css({
            zIndex: getRandomIntInclusive(1, 50),
            position: 'absolute',
            backgroundColor: getRandomMember(colors),
            height: `${height}px`,
            width: `${width}px`,
            left: `${X-width/2}px`,
            top: `${0-height/2}px`,
            animation: `cycle${animStyle} ${fullAnimDuration}s infinite alternate ease-in-out`,
            animationDelay: `${animDelay}s`
        });
        $inner.appendTo($slate);
    }
}





function build_objects(template, Wmin, Wmax, qty, Xleft, Xdens, Xright, YmaxL, YmaxR) {
    var $slate = $('.slate');
    var D = window.Xtimeline_start;
    var $obj = null;
    for (var i=0; i < qty; i++) {
        var fullAnimDuration = getRandomFloatInclusive(2,3);
        var X = (Xright > Xleft) ? triangular(Xleft, Xright, Xdens) : Xleft;
        var Ymax = (X > Xleft) ? (YmaxL + (YmaxR-YmaxL)*(X-Xleft)/(Xright-Xleft)) : YmaxL;
        var Yabs = (Ymax > 0) ? getRandomFloatInclusive(0, Ymax) : 0;
        var width = getRandomFloatInclusive(Wmin, Wmax);
        var height = width;

        $obj = $(window.matter_templates[template]);

        var child_count = 0;

        if (template == 'atom1') {
            child_count = 1;
        }
        if (template == 'atom2') {
            child_count = 2;
        }
        if (child_count) {
            for (var childidx = 0; childidx < child_count; childidx++) {
                var $h = $(window.matter_templates['hadron']);
                $h.addClass(`h${childidx}`);
                $h.appendTo($obj);
            }
        }

        var animDelay = getRandomFloatInclusive(0, fullAnimDuration/2);
        var animStyle = Math.min(window.Ymax, Math.round(Yabs));

        var css_struct = 
            {
            position: 'absolute',
            opacity: 1,
            width: `${width}px`,
            height: `${height}px`,
            left: `${D+X-width/2}px`,
            top: `${0-height/2}px`,
            animation: `cycle${animStyle} ${fullAnimDuration}s infinite alternate ease-in-out`,
            animationDelay: `${animDelay}s`,
            zIndex: getRandomIntInclusive(1, 50)
            };
        console.log(css_struct);

        $obj.css(css_struct);

        $obj.appendTo($slate);
    }
    return $obj;  // Returns the most-recent object built
}

