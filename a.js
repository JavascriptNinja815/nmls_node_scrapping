global.httpOptions = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

// ***************************************************************************************************************************

var fs = require('fs'),  JSONC = require('json-comments');
var cnf = JSONC.parse(fs.readFileSync('./config.json', {encoding: 'utf-8'}));

if(cnf.proxyOn){// proxy: a, a1, i_standart
    var proxy = require('./lib/proxy.js');
    proxy(0);
}
else require('./a1')();









