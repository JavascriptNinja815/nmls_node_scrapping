// получает куки с помощь Nightmare, если нужно получить заголовки использовать cookiesN2.js
// Инструкция: нужен url откуда будет взят куки? можно авторизоваться на сайте сначала


//var url = 'http://www.puntolis.it/storelocator/defaultsearch.aspx?idcustomer=111';
var url = 'http://127.0.0.1:1337/';

var agent = 'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0';

module.exports = function (q) {
    q.pause();
    var Nightmare = require('nightmare'),
        nightmare = Nightmare({show: false, webPreferences: {images: false}});
    nightmare
        .useragent(agent)
        .cookies.clearAll()
        .goto(url)
        //.type('input[id=navbar_username]', 'aelko')
        //.click('.loginbutton')
        //.wait(7000)
        .cookies.get({
            path: '/'
            //secure: true
        })
        .end()
        .then(function (cookies) {
            var cookie={};
            cookies.forEach(b=> cookie[b.name] = b.value);
            var b = global.httpOptions;
            b.cookies = cookie;
            b.user_agent =agent;
            q.resume();
        })
        .catch(function (error) {console.error('Nightmare cookies failed:', error)});
};



