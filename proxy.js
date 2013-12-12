/* Proxy server for oregu.com */

/*jslint node: true */
'use strict';

var httpProxy = require('http-proxy'),
    httpProxyOptions = {
        hostnameOnly: true,
        router: {'oregu.com': '127.0.0.1:8000'}
    };

// Custom server redirect logic before proxying requests.
function redirectOrProxy(request, response, proxy) {
    // Redirect sklyanchuk.com to oregu.com:
    if (request.headers.host === 'oregu.com') {
        proxy.proxyRequest(request, response);
    } else {
        response.writeHead(302, {'Location': 'http://oregu.com'});
        response.end('Redirecting to http://oregu.com ...');
    }
}

// Establish the proxy server with given options,
// and export it for clustering purposes:
module.exports = httpProxy
    .createServer(redirectOrProxy, httpProxyOptions)
    .listen(80);