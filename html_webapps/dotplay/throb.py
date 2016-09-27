import random

# We are just trying to place the object at a given location and have it just move around a tiny bit in both X and Y
local_variance_base = 8
scale_variance_max = 0.3

# UNUSED scale_factor = 1.1

def randomTranslate():
    return 'translate3d(%spx,%spx,0px)' % (
        random.uniform(-local_variance_base, local_variance_base),
        random.uniform(-local_variance_base, local_variance_base))

def randomScale():
    scaler = random.uniform(1-scale_variance_max, 1+scale_variance_max)
    return 'scale3d(%s,%s,1)' % (scaler, scaler)


# We create a number of different animation styles and choose them randomly - the "V" parameter is
# basically meaning "which variant" and has no geometric semantics.
for v in range(0,10):
    print '''@keyframes throbinplace%d {
      0%% { }
     25%% { transform: %s %s; }
     50%% { transform: %s %s; }
     75%% { transform: %s %s; }
    100%% { transform: %s %s; }
}
''' % (v, randomTranslate(), randomScale(), randomTranslate(), randomScale(), randomTranslate(), randomScale(), randomTranslate(), randomScale())
