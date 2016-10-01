# Trying to imitate a 3D rotation around the X axis

import random


# Each animation created here has a different "Y-radius" (A).
# The Y value will range from +A to -A.
# The X value will range from +A/M to -A/M where M provides a ratio (Y-radius over X-radius).

M = 5

for yradius in range(1,200):
    xradius = yradius / M
    xradius = 0
    print '''@keyframes cycle%d {
      %s%% { transform: rotate(%sdeg) translateX(%spx) translateY(%spx) rotate(%sdeg); }
      %s%% { transform: rotate(%sdeg) translateX(%spx) translateY(%spx) rotate(%sdeg); }
      %s%% { transform: rotate(%sdeg) translateX(%spx) translateY(%spx) rotate(%sdeg); }
      %s%% { transform: rotate(%sdeg) translateX(%spx) translateY(%spx) rotate(%sdeg); }
      %s%% { transform: rotate(%sdeg) translateX(%spx) translateY(%spx) rotate(%sdeg); }
}
''' % (yradius,
    0,    0, xradius, yradius/4, 0,
    25,  90, xradius, yradius/2, -90,
    50, 180, xradius, yradius, -180,
    75, 270, xradius, yradius/2, -270,
   100, 360, xradius, yradius/4, -360)
    
