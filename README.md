# esbuild-for-the-soul
An outline for building modern &amp; performant JavaScript bundles w/ esbuild & yarn plug-n-play

## Setup
```
npm i yarn@2.0.0-rc.27 -g
npm start
open http://localhost:3000
```

## Unique features

* Uses 100% ESM for both Node & browser code
* Features a plugin that automatically externalizes dependencies that match a particular pattern
* Automatically add modulepreload links for dependencies that match a particular pattern
* Uses a `berry` release of Yarn 2
