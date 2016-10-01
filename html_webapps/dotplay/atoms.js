window.templ_hadron = `<div class="hadron"><div class="quark upq upleft"></div><div class="quark upq upright"></div><div class="quark downq down"></div></div>`;


// ANIMATION: a simple quiver-in-place, with the duration varying randomly
// SIZE: hardwired constant, source of truth is CSS
function build_hadrons(qty, Xleft, Xdens, Xright, YmaxL, YmaxR) {
    $slate = $('.slate');
    Xbase = Xleft;
    for (var i=0; i < qty; i++) {
        fullAnimDuration = getRandomFloatInclusive(3,8);
        X = triangular(Xleft, Xright, Xdens);
        Ymax = YmaxL + (YmaxR-YmaxL)/(X-Xleft);
        Y = getRandomFloatInclusive(-Ymax, Ymax);
        width = 25;  // hardwired for now, must match css spec
        height = width;

        // NO NEED FOR A "HOLDER" DIV
        $hadron = $(window.templ_hadron);

        animDelay = getRandomFloatInclusive(0, fullAnimDuration);
        animStyle = getRandomIntInclusive(0, 9);

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
    $slate = $('.slate');
    Xbase = Xleft;
    for (var i=0; i < qty; i++) {
        fullAnimDuration = getRandomFloatInclusive(3,8);
        child_count = (i%2) ? 1 : 2;
        X = triangular(Xleft, Xright, Xdens);
        Ymax = YmaxL + (YmaxR-YmaxL)/(X-Xleft);
        Y = getRandomFloatInclusive(-Ymax, Ymax);
        width = 41;  // hardwired for now, must match css spec
        height = width;

        $atom = $(`<div class='atom childcount${child_count}'></div>`);
        for (childidx = 0; childidx < child_count; childidx++) {
            $h = $(window.templ_hadron);
            $h.addClass(`h${childidx}`);
            $h.appendTo($atom);
        }

        animDelay = getRandomFloatInclusive(0, fullAnimDuration);
        animStyle = getRandomIntInclusive(0, 9);

        $atom.css({
            position: 'absolute',
            opacity: 0,
            left: `${X-width/2}px`,
            top: `${Y-height/2}px`,
            animation: `throbinplace${animStyle} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`,
            zIndex: getRandomIntInclusive(1, 50)
        });

        $atom.appendTo($slate);
    }
}
