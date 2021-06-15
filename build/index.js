import esbuild from 'esbuild';
import FS from 'fs';
import Path from 'path';
import esbuildOptions from './options.js';

esbuild.build(esbuildOptions).then(({metafile: {outputs}}) => {
  const modulePreloadPaths = Object.keys(outputs).filter((outputName) => {
    return outputName.includes('node_modules') && !outputName.includes('.map');
  }).map((outputName) => {
    return outputName.replace('target', '.');
  }, {});

  const HTML = FS.readFileSync('./target/index.html').toString();

  FS.writeFileSync('./target/index.html', HTML.replace('<!-- modulepreloads -->', modulePreloadPaths.reduce((accumulator, modulePreloadPath) => {
    return `${accumulator}<link rel="modulepreload" href="${modulePreloadPath}">\n`;
  }, '')));
});