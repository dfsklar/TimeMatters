import sys
import re

stylie_baseX = 84;
target_baseX = 1350;

pattern = re.compile("^(.*transform.translate.)(\d+)(px.*)$");
pattern_after = re.compile(".*html..after.*");

for line in sys.stdin:
    line = line.strip();
    match = pattern.match(line)
    if match:
        stylie_X = float(match.group(2));
        print match.group(1) + str(int(target_baseX + stylie_X - stylie_baseX)) + match.group(3);
    else:
        match = pattern_after.match(line);
        if not match:
            print line
        else:
            print "}"
