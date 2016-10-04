export PATH="$PATH:/root/node_modules/.bin:/usr/sbin"

D=../deploy
mkdir -p $D
/bin/cp * $D
OPT=" --presets latest "
/root/node_modules/.bin/babel  $OPT --out-file $D/atoms.js < atoms.js
/root/node_modules/.bin/babel  $OPT --out-file $D/build.js < build.js
/root/node_modules/.bin/babel  $OPT --out-file $D/timeline.yaml < timeline.yaml
