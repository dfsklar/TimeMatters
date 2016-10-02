D=../../deploy
mkdir -p $D
cp * $D
OPT=" --presets latest "
babel $OPT --out-file $D/atoms.js < atoms.js
babel $OPT --out-file $D/build.js < build.js
babel $OPT --out-file $D/timeline.yaml < timeline.yaml
