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

//-------------------------------------

var opt2 = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    },
    open_timeout: 10000
};
//opt.proxy = 'http://118.151.209.114:80'; // good
//opt.proxy = 'http://190.111.77.40:80';  // bad

//_____________________________________


getProxy(function (proxyURL) { // потом будет вызываться из-вне
    console.log(`Ответ сервера: ${proxyURL}`);
});


function getProxy(cb, checkURL, reg, opt) {

    if (!(a.length - (++n))) {
        cb(false);
        return;
    }

    checkURL = checkURL || 'http://example.com/';
    opt = opt || opt2;
    reg = reg || /<h1>Example Domain<\/h1>/;

    opt.proxy = a[n];


    needle.get(checkURL, opt, function (err, res) {
        if (err || !reg.test(res.body)) {
            console.log(`Bad proxy: ${n+1}, ${opt.proxy}`);
            getProxy(cb, checkURL, reg, opt);
        }
        else { // proxy good
            cb(opt.proxy);
        }
    });
}






