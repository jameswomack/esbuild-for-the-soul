import esbuild from 'esbuild';
import FS from 'fs';
import esbuildOptions from './options.js';

esbuild.build(esbuildOptions).then(({metafile: {outputs}}) => {  
  const modulePreloadPaths = Object.keys(outputs).filter(outputName => (outputName.includes('lodash-es/lodash') || outputName.includes('lodash-es/pick')) && !outputName.includes('.map')).map(outputName => outputName.replace('target', '.'), {});  
  const preexistingHTML = FS.readFileSync('./target/index.html').toString();
  const replacement = `<!-- modulepreloads prologue -->${modulePreloadPaths.reduce((accumulator, modulePreloadPath) => `${accumulator}<link rel="modulepreload" href="${modulePreloadPath}">\n`, '')}<!-- modulepreloads epilogue -->`;
  const modifiedHTML = preexistingHTML.replace(/(<!-- modulepreloads prologue -->)(\D+)(<!-- modulepreloads epilogue -->)/, replacement);

  FS.writeFileSync('./target/index.html', modifiedHTML);
});