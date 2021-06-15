import {pick} from 'lodash-es';
import pick2 from 'lodash-es/pick.js';

import './esbuild-for-the-soul.js';

console.info(pick({foo:'foo'}, 'foo'));
console.info(pick2({foo:'foo'}, 'foo'));