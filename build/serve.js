import esbuild from 'esbuild';
import esbuildOptions from './options.js';
import http from 'http';

esbuild.serve({
  servedir: 'target',
}, esbuildOptions).then(result => {
  // The result tells us where esbuild's local server is
  const {host, port} = result;

  console.info(`Listening on port 3000`);
  
  // Then start a proxy server on port 3000
  http.createServer((req, res) => {
    const options = {
      hostname: host,
      port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };
  
    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, proxyRes => {
      // If esbuild returns "not found", send a custom 404 page
      if (proxyRes.statusCode === 404) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>A custom 404 page</h1>');
        return;
      }
  
      // Otherwise, forward the response from esbuild to the client
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, {end: true});
    });
  
    // Forward the body of the request to esbuild
    req.pipe(proxyReq, {end: true});
  }).listen(3000);
});