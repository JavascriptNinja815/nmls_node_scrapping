// Получает куки и заголовки сайта
// Инструкция. Ввести два url, на сайте можно авторизоваться
// url2 запроса на который будут получаться заголовки !!! должен отличаться от других всех url

var url = 'http://www.govorimpro.us/search.php?do=getnew&contenttype=vBForum_Post';
var url2 = 'http://www.govorimpro.us/forum.php';


var agent = 'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0';
require('nightmare-webrequest-addon');
module.exports = function (q) { // здесь зарегистрироваться
    q.pause();
    var Nightmare = require('nightmare'),
        nightmare = Nightmare({show: true, webPreferences: {images: true}});

    nightmare
        .useragent(agent)
        .cookies.clearAll()
        .onSendHeaders({urls: [url2]})
        .on('onSendHeaders', function (details) {
            global.httpOptions = {headers:details.requestHeaders} ;
            q.resume();
        })
        .goto(url)
        //.type('#vb_login_username', 'aelko')
        //.type('#vb_login_password', 'jrcfysx')
        //.click('.group input[type=submit]')
        //.wait(7000)
        .goto(url2)
        .end()
        .then().catch(function (error) {console.error('Nightmare cookies failed:', error)});
};
