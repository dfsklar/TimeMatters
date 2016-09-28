
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
        width = 31;  // hardwired for now, must match css spec
        height = width;

        // NO NEED FOR A "HOLDER" DIV
        $hadron = $(`<div class="hadron"><div class="quark upq upleft"></div><div class="quark upq upright"></div><div class="quark downq down"></div></div>`);
        // $hadron_holder = $(`<div class="circle-outer"></div>`);
        // $hadron_holder.appendTo($slate);

        $hadron.appendTo($slate);

        animDelay = getRandomFloatInclusive(0, fullAnimDuration);
        animStyle = getRandomIntInclusive(0, 9);

        $hadron.css({
            position: 'absolute',
            left: `${X-width/2}px`,
            top: `${Y-height/2}px`,
            animation: `throbinplace${animStyle} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`
        });
    }
}

        


function build_atoms() {
    Xbase = 500;
    for (var i=0; i < 80; i++) {
        fullAnimDuration = getRandomFloatInclusive(5,9);
        Xdelta = triangular(0, 1600, 800);
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
        });

        yVar = Math.min(Y, 99);
        $atom_holder.css({
            position: 'absolute',
            left: `${X}px`,
            animation: `updown${yVar} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay}s`
        });
    }
}
