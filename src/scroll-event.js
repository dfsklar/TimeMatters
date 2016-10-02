// Here's how we could detect a user's scroll and turn off animation for anything offscreen

$( "#target" ).scroll(function() {
  $( "#log" ).append( "<div>Handler for .scroll() called.</div>" );
});
