import escape_string_regexp from 'escape-string-regexp';
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

const NAME = '@jameswomack/esm-externals';
const NAMESPACE = NAME;

function makeFilter(externals) {
  return new RegExp(`^(${  externals.map(escape_string_regexp).join('|')  })(\\/.*)?$`);
}

export function EsmExternalsPlugin(_a) {
  var {externals} = _a;
  return {
    name: NAME,
    setup (build) {
      var filter = makeFilter(externals);
      build.onResolve({filter: /.*/, namespace: NAMESPACE}, args => {
        const resolution = require.resolve(args.path);
        return {
          path: resolution,
          external: true,
        };
      });
      build.onResolve({filter}, args => {
        const resolution = require.resolve(args.path);
        return {
          path: `./_.._/node_modules/${resolution.split('node_modules/')[1]}`,
          external: true,
          namespace: NAMESPACE,
        };
      });
      build.onLoad({filter: /.*/, namespace: NAMESPACE}, args => {
        const resolution = require.resolve(args.path);
        return {
          contents: `export * as default from ${  JSON.stringify(args.path)  }; export * from ${  JSON.stringify(args.path)  };`,
        };
      });
    },
  };
}
export default EsmExternalsPlugin;