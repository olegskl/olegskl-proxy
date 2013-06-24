/* Proxy server for oregu.com */
/*jslint node: true */
'use strict';

var fs = require('fs'),
    http = require('http'),
    util = require('util'),
    path = require('path'),
    httpProxy = require('http-proxy'),
    httpProxyOptionsFilePath = path.join(__dirname, 'http-proxy-options.json'),
    httpProxyPort = 80;

util.print('Reading proxy options file... ');
fs.readFile(httpProxyOptionsFilePath, 'utf-8', function (error, contents) {
    if (error) {
        util.print('\x1b[31mfailed\x1b[0m.\n');
        return;
    }
    util.print('\x1b[32mdone\x1b[0m.\n');

    // Establish the proxy server with given options on port 80:
    httpProxy.createServer(function (request, response, proxy) {
        // Redirect sklyanchuk.com to oregu.com:
        if (request.headers.host === 'sklyanchuk.com') {
            response.writeHead(302, {'Location': 'http://oregu.com'});
            response.end('Redirecting to http://oregu.com ...');
        } else {
            proxy.proxyRequest(request, response);
        }
    }, JSON.parse(contents)).listen(httpProxyPort);

    console.log('Proxy server running on port ' + httpProxyPort + '.');
});