//NotesKeeper: homa - hd - parsing

cheerio = require('cheerio');

exports.n = function (bdata) {
    var n = 0;
    for (var k in bdata) n++;
    return n;
};

exports.one = function (bdata, f, s) {
    f(cheerio.load(bdata[s].str), bdata[s]);
};

exports.arr = function (bdata, f, arr) {
    arr.forEach(s=> f(cheerio.load(bdata[s].str), bdata[s]));
};

exports.all = function (bdata, f) {
    for (var k in bdata) f(cheerio.load(bdata[k].str), bdata[k])
};

exports.enum = function (bdata, f, from, to) {
    var ar = [];
    for (var k in bdata) ar.push(bdata[k]);
    from = from - 1 || 0;
    to = to || ar.length;
    to--;
    for (var i = from; i <= to; i++) f(cheerio.load(ar[i].str), ar[i])
};


