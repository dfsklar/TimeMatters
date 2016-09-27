function build_hadrons() {
    // 2 HADRONS
    // 2 HADRONS
    // 2 HADRONS

    Xbase = 300;
    for (var i=0; i < 80; i++) {
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
            animationDelay: `${animDelay+(fullAnimDuration/2)}s`
        });

        yVar = Math.min(Y, 99);
        $hadron_holder.css({
            position: 'absolute',
            left: `${X}px`,
            animation: `updown${yVar} ${fullAnimDuration}s infinite ease-in-out alternate`,
            animationDelay: `${animDelay}s`
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
