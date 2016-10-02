window.templ_hadron = `<div class="hadron"><div class="quark upq upleft"></div><div class="quark upq upright"></div><div class="quark downq down"></div></div>`;


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
