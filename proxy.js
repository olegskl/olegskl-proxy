/*jslint node: true */
'use strict';

var http = require('http'),
    httpProxy = require('http-proxy'),
    config = require('./config'),
    proxy = httpProxy.createProxyServer({});

// Custom server redirect logic before proxying requests.
function redirectOrProxy(request, response) {
    var target = config.proxyRoutesConfig[request.headers.host];
    if (target) {
        proxy.web(request, response, {target: target});
    } else {
        // Redirect other domains to olegskl.com:
        response.writeHead(302, {'Location': 'http://olegskl.com'});
        response.end('Redirecting to http://olegskl.com ...');
    }
}

// Establish the proxy server with given options,
// and export it for clustering purposes:
module.exports = http
    .createServer(redirectOrProxy)
    .listen(config.proxyPort);
