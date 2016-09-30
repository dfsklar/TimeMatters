// Returns a random number between A and C, where B is the "most likely" outcome
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
        $newbie.on("tap", function(event) {
            $( "#mypanel" ).panel( "open" , {} );
        });
    }

    // Setup prose display upon user tap of a timeline marker
    $('.timemarker').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        items: {
            src: '<div class=timemarker-prose><table><tr><td class=time>0</td><td class=label>Cosmic Egg?</td></tr></table><p>DEMO MODE!  CURRENTLY HARDWIRED TO SHOW ONLY THE COSMIC-EGG PROSE!<p>Prevailing theory suggests that all energy in our known Universe was condensed into a tiny area, possibly smaller than a single atom. It was hot, dense, a singularity. No one knows what surrounded it or came before it. Theories include Infinite Everything; Nothing.</p><p>An alternate theory imagines a Multiverse, millions of Universes-- fabrics or membranes-- vibrating in close proximity. As the membranes of two universes collided, our Universe, was born. It is possible that there was no beginning.</p></div>',
        }
    });


    // PARAMS:
    // 1) how many to build
    // 2) leftmost X before these start appearing
    // 3) X value where density should be highest (triangular dist)
    // 4) rightmost X
    // 5) maxY at the leftmost point
    // 6) maxY at the rightmost point
    build_hadrons(12, 300, 500, 900, 30, 80);

    build_atoms(12, 400, 800, 1100, 30, 80);

    
    // 1 BEGINNING OF THE UNIVERSE
    // 1 BEGINNING OF THE UNIVERSE
    // 1 BEGINNING OF THE UNIVERSE
    // 1 BEGINNING OF THE UNIVERSE
    
    maxy_to_x_ratio = 0.10;
    for (var i=0; i < 400; i++) {
        fullAnimDuration = getRandomFloatInclusive(2,3);
        X = triangular(0, 3000, 120);
        Y = getRandomFloatInclusive(-X*maxy_to_x_ratio, X*maxy_to_x_ratio);
        width = getRandomIntInclusive(7,11);
        height = width;
        animDelay = 0; //getRandomFloatInclusive(0, fullAnimDuration);
        animStyle = getRandomIntInclusive(0, 9);

        // . c i r c l e  (the innermost)
        $inner = $(`<div class="circle" id="cc${i}"></div></div>`);
        $inner.css({
            position: 'absolute',
            backgroundColor: getRandomMember(colors),
            height: `${height}px`,
            width: `${width}px`,
            left: `${X-width/2}px`,
            top: `${Y-height/2}px`,
            animation: `throbinplace${animStyle} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: 0 //`${animDelay+(fullAnimDuration/2)}s`
        });

        if (0) {
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
        } else {
            $inner.appendTo($slate);
        }
    }


    setTimeout(function() {
        window.mySlateScroller = new IScroll('#slatewrapper', {
            scrollX: true,
            momentum: false,
            tap: true,
            desktopCompatibility: true,
            preventDefault: false
        });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
               5);

});
