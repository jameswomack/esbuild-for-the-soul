import {pnpPlugin} from '@yarnpkg/esbuild-plugin-pnp';
import {EsmExternalsPlugin} from './plugins/esm-externals.js';
import {createRequire} from 'module';
import _resolutions from './_resolutions.js';

const require = createRequire(import.meta.url);

export default {
  entryPoints: [require.resolve('../sources/index.js'), require.resolve('lodash-es'), ..._resolutions],
  bundle: true,
  outdir: 'target/scripts',
  metafile: true,
  outbase: 'sources',
  sourcemap: 'external',
  splitting: true,
  format: 'esm',
  plugins: [pnpPlugin(),EsmExternalsPlugin({externals: ['lodash-es']})],
};