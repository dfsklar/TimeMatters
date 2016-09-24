function triangular(a, b, c) {
    var U = Math.random();
    var F = (c - a) / (b - a);
    if (U <= F)
        return a + Math.sqrt(U * (b - a) * (c - a));
    else
        return b - Math.sqrt((1 - U) * (b - a) * (b - c));
}


function lnRandomScaled(gmean, gstddev)
{
    // Get a standard normally distributed number using Box-Muller
    var z1 = Math.sqrt(-2 * Math.log(1.0 - Math.random())) * Math.sin(2 * Math.PI * Math.random());
    // Transform the number to the log normal distribution
    var x = Math.exp(gmean + gstddev * z1);
    return x;
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

    $slate = $('.slate');


    // TIMELINE!!
    // TIMELINE!!
    // TIMELINE!!

    $timeline = $('.timeline');

    timeline = YAML.parse(window.TIMELINE_IN_YAML);
    timeline_points = timeline.seq_timeline;
    console.log(timeline);

    timeline_x_factor = 80;
    for (i=0; i < timeline_points.length; i++) {
        rec = timeline_points[i];
        $newbie = $(`<div class=timemarker><div class=notch></div><div class=label><div class=time>${rec['time']}</div><div>${rec['label']}</div></div></div>`);
        $newbie.css({
            left: `${rec.x * timeline_x_factor}`
        });
        $timeline.append($newbie);
    }




    // ATOMS

    Xbase = 500;
    for (var i=0; i < 20; i++) {
        fullAnimDuration = getRandomFloatInclusive(5,9);
        Xdelta = triangular(0, 600, 300);
        X = Xbase + Xdelta;
        Y = Math.floor(getRandomFloatInclusive(Xdelta*0.02, Xdelta*0.25));
        width = 41;  // hardwired for now, must match css spec
        height = width;
        animDelay = getRandomFloatInclusive(0, fullAnimDuration);
        child_count = (i%2) ? 1 : 2;
        $atom = $(`<div class='atom childcount${child_count}'></div>`);
        for (childidx = 0; childidx < child_count; childidx++) {
            $h = $(`<div class="hadron h${childidx}"><div class="quark upq upleft"></div><div class="quark upq upright"></div><div class="quark downq down"></div></div>`);
            $h.appendTo($atom);
        }
        $atom_holder = $(`<div class="circle-outer"></div>`);
        $atom.appendTo($atom_holder);
        $atom_holder.appendTo($slate);
        $atom.css({
            left: `-${width/2}px`,
            top: `-${height/2}px`,
            animation: `animcircle ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`,
            animationDelay: `0s`
        });

        yVar = Math.min(Y, 99);
        $atom_holder.css({
            position: 'absolute',
            left: `${X}px`,
            animation: `updown${yVar} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay}s`
        });
    }
    



    // 2 HADRONS
    // 2 HADRONS
    // 2 HADRONS

    Xbase = 300;
    for (var i=0; i < 50; i++) {
        fullAnimDuration = getRandomFloatInclusive(5,9);
        Xdelta = triangular(0, 900, 200);
        X = Xbase + Xdelta;
        Y = Math.floor(getRandomFloatInclusive(Xdelta*0.02, Xdelta*0.25));
        width = 31;  // hardwired for now, must match css spec
        height = width;
        animDelay = getRandomFloatInclusive(0, fullAnimDuration);
        $hadron = $(`<div class="hadron"><div class="quark upq upleft"></div><div class="quark upq upright"></div><div class="quark downq down"></div></div>`);
        $hadron_holder = $(`<div class="circle-outer"></div>`);
        $hadron.appendTo($hadron_holder);
        $hadron_holder.appendTo($slate);
        $hadron.css({
            left: `-${width/2}px`,
            top: `-${height/2}px`,
            animation: `animcircle ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`,
            animationDelay: `0s`
        });

        yVar = Math.min(Y, 99);
        $hadron_holder.css({
            position: 'absolute',
            left: `${X}px`,
            animation: `updown${yVar} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay}s`
        });
    }

        

    
    // 1 BEGINNING OF THE UNIVERSE
    // 1 BEGINNING OF THE UNIVERSE
    // 1 BEGINNING OF THE UNIVERSE
    // 1 BEGINNING OF THE UNIVERSE

    for (var i=0; i < 300; i++) {
        fullAnimDuration = getRandomFloatInclusive(2,3);
        X = triangular(0, 1300, 160);
        console.log(`X = ${X}`);
        Y = Math.floor(getRandomFloatInclusive(X*0.02, X*0.25));
        width = getRandomIntInclusive(6,10);
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
        yVar = Math.min(Y, 99);
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
