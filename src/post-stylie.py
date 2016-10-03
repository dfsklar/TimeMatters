import sys
import re

stylie_baseX = 84;
target_baseX = 1350;

stylie_baseY = 139;
target_baseY = 0;

pattern = re.compile("^(.*transform.translate.)(\d+)(px, )(\d+)(px.*)$");
pattern_after = re.compile(".*html..after.*");

for line in sys.stdin:
    line = line.strip();
    match = pattern.match(line)
    if match:
        stylie_X = float(match.group(2));
        stylie_Y = float(match.group(4));
        print match.group(1) + str(int(target_baseX + stylie_X - stylie_baseX)) + match.group(3) + str(int(target_baseY + stylie_Y - stylie_baseY)) + match.group(5);
    else:
        match = pattern_after.match(line);
        if not match:
            print line
        else:
            print "}"
