// получает куки с помощью needle
// Инструкция: нужен только url откуда будет взят куки

//var url = 'http://www.puntolis.it/storelocator/defaultsearch.aspx?idcustomer=111';
var url = 'http://127.0.0.1:1337/';

var agent = 'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0';

module.exports = function (q) {
    q.pause();
    var needle = require('needle');
    needle.get(url, {user_agent:agent}, function(err, res){
        if (err) throw err;
        global.httpOptions.cookies = res.cookies;
        global.httpOptions.user_agent = agent;
        q.resume();
    });
};

