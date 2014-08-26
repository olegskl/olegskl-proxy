/* Proxy server for olegskl.com */

/*jslint node: true */
'use strict';

var httpProxy = require('http-proxy'),
    httpProxyOptions = {
        hostnameOnly: true,
        router: {'olegskl.com': '127.0.0.1:8000'}
    },
    port = 80;

// Custom server redirect logic before proxying requests.
function redirectOrProxy(request, response, proxy) {
    if (request.headers.host === 'olegskl.com') {
        proxy.proxyRequest(request, response);
    } else {
        // Redirect other domains to olegskl.com:
        response.writeHead(302, {'Location': 'http://olegskl.com'});
        response.end('Redirecting to http://olegskl.com ...');
    }
}

// Establish the proxy server with given options,
// and export it for clustering purposes:
module.exports = httpProxy
    .createServer(redirectOrProxy, httpProxyOptions)
    .listen(port);
