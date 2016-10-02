D=../../deploy
mkdir -p $D
cp * $D
OPT=" --presets latest "
babel $OPT --out-file $D/_atoms.js < atoms.js
babel $OPT --out-file $D/_build.js < build.js
babel $OPT --out-file $D/_timeline.yaml < timeline.yaml
