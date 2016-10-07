import sys
import re

stylie_baseX = 84;
target_baseX = 1350;

stylie_baseY = 139;
target_baseY = 0;

#                       1       2                     3    4     5    6
pattern = re.compile("^(\d+% {)(transform.translate.)(\d+)(px, )(\d+)(px.*)$");

pattern_after = re.compile(".*html..after.*");

for line in sys.stdin:
    line = line.strip();
    match = pattern.match(line)
    if match:
        stylie_X = float(match.group(3));
        stylie_Y = float(match.group(5));
        percentage = match.group(1)
        start_actions = match.group(2)
        opacity = 1
        if '20%' in percentage:
            percentage = '10% {'
        if '0% {' == percentage:
            opacity = 0
        if '100%' in percentage:
            opacity = 0
        if '80' in percentage:
            percentage = '90% {'
        start_actions = 'opacity:' + str(opacity) + '; ' + start_actions
        print percentage + start_actions + str(int(target_baseX + stylie_X - stylie_baseX)) + match.group(4) + str(int(target_baseY + stylie_Y - stylie_baseY)) + match.group(6);
    else:
        match = pattern_after.match(line);
        if not match:
            print line
        else:
            print "}"
