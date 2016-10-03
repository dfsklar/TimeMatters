"use strict";

// Returns a random number between A and C, where B is the "most likely" outcome
function triangular(a, b, c) {
    var U = Math.random();
    var F = (c - a) / (b - a);
    if (U <= F)
        return a + Math.sqrt(U * (b - a) * (c - a));
    else
        return b - Math.sqrt((1 - U) * (b - a) * (b - c));
}

function getQueryParameterByName(name, defaultval) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return defaultval;
    if (!results[2]) return defaultval;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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


function buildTimeline($slate) {
    var $timeline = $('.timeline');

    var timeline = YAML.parse(window.TIMELINE_IN_YAML);
    var timeline_points = timeline.seq_timeline;
    console.log(timeline);

    var timeline_x_factor = 88;
    for (var i=0; i < timeline_points.length; i++) {
        var rec = timeline_points[i];
        var $newbie = $(`<div class=timemarker><div class=notch></div><div class=label><div class=time>${rec['time']}</div><div>${rec['label']}</div></div></div>`);
        $newbie.css({
            left: `${rec.x * timeline_x_factor}`
        });
        $timeline.append($newbie);
    }

    if (getQueryParameterByName('showhashmarks', false)) {
        for (i=0; i < 2400; i = i+100) {
            $newbie = $(`<div class=xmarker><div class=notch></div><div class=label>${i}</div></div>`);
            $newbie.css({
                left: `${i}`
            });
            $timeline.append($newbie);
        }
    }

    // Setup prose display upon user tap of a timeline marker
    $('.timemarker').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        items: {
            src: '<div class=timemarker-prose><table><tr><td class=time>0</td><td class=label>Cosmic Egg?</td></tr></table><p>DEMO MODE!  CURRENTLY HARDWIRED TO SHOW ONLY THE COSMIC-EGG PROSE!<p>Prevailing theory suggests that all energy in our known Universe was condensed into a tiny area, possibly smaller than a single atom. It was hot, dense, a singularity. No one knows what surrounded it or came before it. Theories include Infinite Everything; Nothing.</p><p>An alternate theory imagines a Multiverse, millions of Universes-- fabrics or membranes-- vibrating in close proximity. As the membranes of two universes collided, our Universe, was born. It is possible that there was no beginning.</p></div>',
        }
    });

    return $timeline;
}




function setup_iscroll() {
        window.mySlateScroller = new IScroll('#slatewrapper', {
            scrollX: true,
            zoom: true,
            zoomMax: 2,
            zoomMin: 0.2,
            startZoom: getQueryParameterByName('zoom', 0.6),
            momentum: false,
            tap: true,
            desktopCompatibility: true,
            preventDefault: false
        });
        // For iscroll to work:
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}



$(document).ready(function() {

    Math.seedrandom(getQueryParameterByName('seed','helloiofjew.'));

    var $slate = $('.slate');


    // PARAMS:
    // 1) how many to build
    // 2) leftmost X before these start appearing
    // 3) X value where density should be highest (triangular dist)
    // 4) rightmost X
    // 5) maxY at the leftmost point
    // 6) maxY at the rightmost point

    build_objects('hadron', 45, 320,  500, 1800, 50, 130);
    build_objects('dense1', 20, 320,  500, 1800, 50, 130);
    build_objects('dense2', 20, 320,  500, 1800, 50, 130);
    build_objects('black',  20, 320,  500, 1800, 50, 130);

    build_atoms(45,   500,  700, 1800, 50, 130);

    // build_particles(150);

    // No need to do this in a timeout!
    setup_iscroll();

    if (getQueryParameterByName('instant', false)) {
        var $T = buildTimeline($slate);
        $T.addClass('visible-instant');
    } else {
        setTimeout(function() {
            window.mySlateScroller.zoom(1, 0, 0, 8000);
            var $T = buildTimeline($slate);
            $T.addClass('visible');
        }, 3000);
    }

});
