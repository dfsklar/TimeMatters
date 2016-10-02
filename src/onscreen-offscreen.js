jQuery.expr.filters.offscreen = function(el) {
  var rect = el.getBoundingClientRect();
  return (
           (rect.x + rect.width) < 0 
             || (rect.y + rect.height) < 0
             || (rect.x > window.innerWidth || rect.y > window.innerHeight)
         );
};

// USAGE:

// returns all elements that are offscreen
// $(':offscreen');

// boolean returned if element is offscreen
// $('div').is(':offscreen');

