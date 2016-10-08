"use strict";

window.Xtimeline_start = 30;
window.Ymax = 200;  // The furthest from the X axis any object's *CENTER* should be

function strip_html_breaks(s) {
    return s.replace(/<br.>/g,' ');
}

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

// Returns a random integer between min (included) and max (probably not exactly included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomFloatInclusive(min, max) {
    return min + (Math.random() * (max - min));
}
var getRandomFloat = getRandomFloatInclusive;

function getRandomMember(items) {
    return items[Math.floor(Math.random()*items.length)];
}


function buildTimeline($slate) {
    var $timeline = $('.timeline');
    $timeline.css({
        left: `${window.Xtimeline_start}px`
    });

    var timeline = YAML.parse(window.TIMELINE_IN_YAML);
    var timeline_points = timeline.seq_timeline;
    // console.log(timeline);

    var timeline_x_factor = 88;
    for (var i=0; i < timeline_points.length; i++) {
        var rec = timeline_points[i];
        var $newbie = $(`<div class=timemarker><div class=notch></div><div class=label><div class=time>${rec['time']}</div><div>${rec['label']}</div></div></div>`);
        $newbie.css({
            left: `${rec.x * timeline_x_factor}`
        });
        $timeline.append($newbie);
        // Setup prose display upon user tap of a timeline marker
        $newbie.magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
            items: {
                src: `<div class=timemarker-prose><table><tr><td class=time>${strip_html_breaks(rec.time)}</td><td class=label>${rec.label}</td></tr></table><p>${rec.description}</p></div>`
            }
        });
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



/*
            ***      <--  return -1
         ***   ***   <--  return  0
         ^ Xlocal=0
          ^ Xlocal=1
*/
function bend_branch_upward(Xlocal) {
    return 0 + Math.sin(Xlocal/120) * 40;
}

function construct() {

    var dense_types = ['dense1', 'dense2', 'black', 'hadron'];
    var atom_types = ['atom1', 'atom2'];

    Math.seedrandom(getQueryParameterByName('seed','helloiofjew.'));

    var $slate = $('.slate');


    build_leaves($slate, 'leaf', 8, 100);

    var $egg = build_objects($slate, 'white',  36, 36,     1,     0,    0,    0,     0,   0);
    $egg.css({zIndex: 3333});


    // UPPER BRANCH
    build_particles($('.upper_branch'), 7, 9,      60,      1500, 2000, 2250,    20, 20, 
                    {function_y_variation: bend_branch_upward});
    for (let s of dense_types) {
        build_objects($('.upper_branch'), s, 20, 30,    3,   1500, 1600, 2100,    30, 15,
                      {function_y_variation: bend_branch_upward});
    }


    // BUILD-OBJECTS PARAMS:
    //
    // template name
    // min width
    // max width
    //
    // how many to build
    //
    // leftmost X before these start appearing
    // X value where density should be highest (triangular dist)
    // rightmost X
    //
    // maxY at the leftmost point
    // maxY at the rightmost point

    build_objects($slate, 'hadron', 25, 25,    20,   320, 400, 900,   45, 120);

    for (let s of dense_types) {
        var width_min = 25;
        var width_max = (s=='hadron') ? 25 : 40;
        build_objects($slate, s, width_min, width_max,    20,   600,  1300, 1800,   120, 120);
    }

    // ATOMS
    for (let att of atom_types) {
        build_objects($slate, att,   35, 35,   20,   500,  700, 1800,    80, 120);
    }



    // ***************
    // MIDDLE BRANCH
    for (let s of dense_types) {
        build_objects($slate, s, 20, 30,    4,   1500,  1900, 2100,   30, 15);
    }



    // ***************
    // LOWER BRANCH
    var $low = $('.lower_branch');
    for (let s of dense_types) {
        build_objects($low, s, 20, 30,    4,   1500,  1900, 2100,   30, 15);
    }
    for (let s of atom_types) {
        build_objects($low, s, 35, 35,    4,   1500,  1900, 2100,   30, 15);
    }



    // PARTICLES (the tiny dots)
    //
    // min width
    // max width
    //
    // how many to build
    //
    // leftmost X before these start appearing
    // X value where density should be highest (triangular dist)
    // rightmost X
    //
    // maxY at the leftmost point
    // maxY at the rightmost point
    //
    // 
    // 1. Cone shape of particles near the origin
    build_particles($slate, 7, 9,       60,      58, null,  1500,     10,  148, 
                   {
                       full_anim_duration: 0.3,
                       inter_x_init: 5,
                       inter_x_pow_grow: 1.015
                   });
    // 2. Particles once we get past 300K years
    // build_particles($slate, 9, 13,       80,     500,  800, 1900,     43, 120);

}


$(document).ready(function() {

    var $slate = $('.slate');

    window.instant = ('true' == getQueryParameterByName('instant', 'false'));

    construct();

    setup_iscroll();

    if (window.instant) {
        var $T = buildTimeline($slate);
        window.instant = true;
        $T.addClass('visible-instant');
    } else {
        window.instant = false;
        setTimeout(function() {
            window.mySlateScroller.zoom(1, 0, 0, 8000);
            var $T = buildTimeline($slate);
            $T.addClass('visible');
        }, 15000);
    }

});
