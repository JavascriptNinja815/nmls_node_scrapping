'use strict';
var fs = require('fs');
var needle = require('needle');

// *****************************************************************************************************************

var a = [];
var s = fs.readFileSync('./proxy.txt', {encoding: 'utf-8'}).trim();
if (s) {
    s = s.replace(/ +/g, '');
    s = s.replace(/(\s)+/g, '\n');
    a = s.split('\n');
}

//console.log(a);

// *****************************************************************************************************************

var n = -1;
var searchingNow = false;

var opt = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    },
    open_timeout: 7000
};
var checkURL = 'http://example.com/';
var reg = /<h1>Example Domain<\/h1>/;

// *****************************************************************************************************************

module.exports = function (time, q) {
    if(searchingNow) {
        return;
    }
    searchingNow = true;
    setTimeout(getProxy, time, function (proxyURL) {
        if (proxyURL) {
            global.httpOptions.proxy = proxyURL;
            if (q) q.resume();
            else require('../a1')();
        }
        else throw "No normal proxy.";
    });
};

function getProxy(cb) {
    if (!(a.length - (++n))) {
        cb(false);
        return;
    }

    opt.proxy = a[n];

    needle.get(checkURL, opt, function (err, res) {
        if (err || !reg.test(res.body)) {
            console.log(`\nBad proxy: ${n + 1}, ${opt.proxy}`);
            getProxy(cb);
        }
        else { //  good proxy
            console.log(`\nGood  proxy: ${n + 1}, ${opt.proxy}`);
            searchingNow = false;
            cb(opt.proxy);
        }
    });
}






