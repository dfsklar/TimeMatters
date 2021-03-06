# Trying to imitate a 3D rotation around the X axis

import random


# Each animation created here has a different "Y-radius" (A).
# The Y value will range from +A to -A.
# The X value will range from +A/M to -A/M where M provides a ratio (Y-radius over X-radius).

M = 3



for yradius in range(1,200):
    xradius = (yradius*1.0) / M
    xradius = 0
    tuple = (yradius,
                0,   -xradius, -yradius,
              100,    xradius,  yradius
        )
    print '''@keyframes cycle%d {
      %s%% { transform: translate3d(%spx,%spx,0px); }
      %s%% { transform: translate3d(%spx,%spx,0px); }
}
''' % tuple
    print '''@-webkit-keyframes cycle%d {
      %s%% { -webkit-transform: translate3d(%spx,%spx,0px); }
      %s%% { -webkit-transform: translate3d(%spx,%spx,0px); }
}
''' % tuple
