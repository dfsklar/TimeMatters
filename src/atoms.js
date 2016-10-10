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



function build_leaves($root, klass, num_of_variants, qty) {
    for (var i=0; i < qty; i++) {
        var variant = getRandomIntInclusive(1, num_of_variants);
        var keyframes_variant = getRandomIntInclusive(1, 2);
        var $leaf = $(`<div class='${klass} composite-${variant}'</div>`);
        var animDuration = getRandomFloat(6,7);
        var animDelay = i * 0.1;
        $leaf.css({
            opacity: 0,
            animationName: `stylie-transform-keyframes-${keyframes_variant}`,
            animationDuration: `${animDuration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationDelay: `${animDelay}s`
        });
        $leaf.appendTo($root);
    }
}






function build_sentients($root, klass, num_of_variants, qty) {
    for (var i=0; i < qty; i++) {
        var variant = getRandomIntInclusive(1, num_of_variants);
        var keyframes_variant = getRandomIntInclusive(1, 2);
        var $obj = $(`<div class='${klass} composite-${variant}'</div>`);
        var animDuration = getRandomFloat(6,7);
        var animDelay = i * 0.1;
        $obj.css({
            opacity: 0,
            animationName: `stylie-transform-keyframes-${keyframes_variant}`,
            animationDuration: `${animDuration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationDelay: `${animDelay}s`,
        });
        $obj.appendTo($root);
    }
}




// Special meaning for Xleft/dens/right:
// If Xdens==null, then the desired qty is to be "evenly" distributed from Xleft to Xright.
// The "even" distribution will actually be done in a way that causes the sapce between
// adjacent particles to get slightly larger with each iteration.
//
// Wmin == minimum width
function build_particles($root, Wmin, Wmax, qty, Xleft, Xdens, Xright, YmaxL, YmaxR, opts) {
    opts = opts || {};

    if (!opts.visibility_delay_base) {
        opts.visibility_delay_base = 0;
    }

    if (!opts.base_anim_delay) {
        opts.base_anim_delay = 0;
    }

    if (!opts.randomize_y) {
        opts.randomize_y = false;
    }

    if (!opts.function_y_variation) {
        opts.function_y_variation = null;
    }

    var colors = COLORS;
    var Xcur = Xleft;
    var Xdelta = (Xright-Xleft+1.0) / qty;  // for the non-random uniform-distr
    var X = Xleft;
    if (opts.inter_x_init && (Xdens == null)) {
        // This is a completely different approach: 
        // The "qty" is basically going to be ignored.  The "delta" rules.
        // The "even" distribution will actually be done in a way that causes the sapce between
        // adjacent particles to get slightly larger with each iteration.
        Xdelta = opts.inter_x_init;
        X = Xleft - Xdelta;
        qty = 999999;
    }

    var class_this_group = `particle-basedelay-${opts.visibility_delay_base}`;

    for (var i=0; i < qty; i++) {
        if (Xdens != null) {
            X = (Xright > Xleft) ? triangular(Xleft, Xright, Xdens) : Xleft;
        } else {
            if (opts.inter_x_init) {
                X += Xdelta;
                if (X >= Xright) {
                    break;
                }
                // prepare for the next iteration
                Xdelta = Math.pow(Xdelta, opts.inter_x_pow_grow);
                // console.log(Xdelta);
            }
            else if (i==0) {
                X = Xleft;
            } else {
                X = Xleft + (i*Xdelta);
            }
        }
        var Ymax = (X > Xleft) ? (YmaxL + (YmaxR-YmaxL)*(X-Xleft)/(Xright-Xleft)) : YmaxL;
        var Y = opts.randomize_y ?  ((Ymax > 0) ? getRandomFloatInclusive(0, Ymax) : 10)  :    Ymax;
        var width = getRandomFloatInclusive(Wmin, Wmax);
        var height = width;
        var fullAnimDuration = (opts.full_anim_duration || (Math.max(YmaxR / 100, 0.2))) * getRandomFloatInclusive(0.99,1.01);
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
        var animDelay = (window.instant ? 0 : (opts.base_anim_delay + ((X-Xleft) * 0.005)));
        var animStyle = Math.min(window.Ymax, Math.round(Y));

        var Ydelta = (opts.function_y_variation ? opts.function_y_variation(X-Xleft): 0);

        var $obj = $(`<div class="circle" id="cc${i}"></div></div>`);
        $obj.addClass(class_this_group);
        $obj.css({
            zIndex: getRandomIntInclusive(1, 50),
            opacity: window.instant ? 1 : 0,
            position: 'absolute',
            backgroundColor: getRandomMember(colors),
            height: `${height}px`,
            width: `${width}px`,
            left: `${X-width/2}px`,
            top: `${Ydelta-height/2}px`,
            animationName: `cycle${animStyle}`,
            animationDuration: `${fullAnimDuration}s`,
            animationDirection: 'alternate',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${1+animDelay}s`,
            transitionProperty: 'opacity',
            transitionDuration: '0.2s',
            transitionDelay: `${animDelay}s`
        });
        $obj.appendTo($root);
        var target_speed = Math.pow(0.7, (X-120)/8) + getRandomFloatInclusive(80, 120);
        var target_duration = (2*animStyle) / target_speed;

        var func_slowDownParticles = function($_inner, duration, animStyle) {
            //console.log("FFFFFFFFF");
            //console.log($_inner);
            //console.log(duration);
            $_inner.css({
                animationName: `cycle${animStyle}`,
                animationDuration: `${duration}s`,
                animationDirection: 'alternate',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `0s`
            });
        };
        var f = func_slowDownParticles;

        if (window.instant) {
            f($obj, target_duration, animStyle);
        }else{
            // This timer is purely for the "slow-down" of the core particles' motions.
            // Note that the slowdown is currently NOT working on any iPhones.
            // ******** setTimeout(f.bind(null, $inner, target_duration, animStyle), parseInt(animDelay*1000 + 2500));
        }
    }

    if (!window.instant) {
        // BRING IN THE VISIBILITY OF THE OBJECTS.
        setTimeout(function() {
            $(`.${class_this_group}`).css({
                opacity: 1
            });
        }, opts.visibility_delay_base);
    }

}





function build_objects($root, template, Wmin, Wmax, qty, Xleft, Xdens, Xright, YmaxL, YmaxR, opts) {
    opts = opts || {};

    if (!opts.visibility_delay_base) {
        opts.visibility_delay_base = 0;
    }

    if (!opts.base_anim_delay) {
        opts.base_anim_delay = 0;
    }

    if (!opts.function_y_variation) {
        opts.function_y_variation = null;
    }

    var D = window.Xtimeline_start;
    var $obj = null;

    var class_this_group = `${template}-basedelay-${opts.visibility_delay_base}`;


    for (var i=0; i < qty; i++) {
        var fullAnimDuration = getRandomFloatInclusive(2.5, 4);
        var X = (Xright > Xleft) ? triangular(Xleft, Xright, Xdens) : Xleft;
        var Ymax = (X > Xleft) ? (YmaxL + (YmaxR-YmaxL)*(X-Xleft)/(Xright-Xleft)) : YmaxL;
        var Yabs = (Ymax > 0) ? getRandomFloatInclusive(2*Ymax/3, Ymax) : 0;
        var width = getRandomFloatInclusive(Wmin, Wmax);
        var height = width;

        $obj = $(window.matter_templates[template]);
        
        $obj.addClass(class_this_group);

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

        var animDelay = opts.base_anim_delay + (window.instant ? 0 : (X*0.002));
        var animStyle = Math.min(window.Ymax, Math.round(Yabs));

        var Ydelta = (opts.function_y_variation ? opts.function_y_variation(X-Xleft): 0);

        var css_struct = 
            {
                position: 'absolute',
                opacity: `${(animStyle==0) ? 1 : 0}`,
                width: `${width}px`,
                height: `${height}px`,
                left: `${D+X-width/2}px`,
                top: `${Ydelta-height/2}px`,
                animationName: `cycle${animStyle}`,
                animationDuration: `${fullAnimDuration}s`,
                animationDirection: 'alternate',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${animDelay}s`,
                zIndex: (opts.zindex || getRandomIntInclusive(1, 50)),
                transitionProperty: 'opacity',
                transitionDuration: '0.3s',
                transitionDelay: `${animDelay}s`
            };
        
        $obj.css(css_struct);
        
        $obj.appendTo($root);
    }

    if (!window.instant) {
        // BRING IN THE VISIBILITY OF THE OBJECTS.
        setTimeout(function() {
            $(`.${class_this_group}`).css({
                opacity: 1
            });
        }, opts.visibility_delay_base);
    }
    
    return $obj;  // Returns the most-recent object built
}

