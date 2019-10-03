var tress = require('tress'),
    needle = require('needle'),
    cheerio = require('cheerio'),
    fmin = require('../lib/fmin.js'), // little functions
    proxy = require('../lib/proxy.js');

var fs = require('fs'),  JSONC = require('json-comments');
var cnf = JSONC.parse(fs.readFileSync('./config.json', {encoding: 'utf-8'}));

var iLim = 1, limit = 0;
var back, results, chee;
var retryType = false; // true - error, false - updateSite
var nErr = 0;

// ******************************************************************************************************************************
module.exports = function (f_callback, nThreads, errorTime, limi, backup, result, cheer, log) {
    results = result;
    chee = cheer;
    back = backup;
    if (limi) {
        limit = limi;
        log.log('Limit: ' + limit);
    }

    var q = tress(crawl, nThreads);

    function crawl(p, callback) {
        back.saveCopy(q, results);

        var url = `https://www.nmlsconsumeraccess.org/EntityDetails.aspx${p}`;
        //var url = `http://www.sfhjsfdhnmlsconsumeraccess.org/EntityDetails.aspx${p}`;
        needle.get(url, global.httpOptions, function (err, res) {
            if (err) {
                if (++nErr > 10 && cnf.proxyOn){
                    log("Too many errors, Searching for a new proxy ...");
                    callback(true);
                    proxy(15000, q); // 15 sec
                    return;
                }
                else {
                    retryType = true;
                    log((err || res.statusCode) + ' - ' + url);
                    return callback(true); // return url in the top of the queue
                }
            }
            nErr = 0;
            var b_send = chee ? cheerio.load(res.body ) : res.body;
            f_callback( b_send, p, res.body, callback);
            if (limit && iLim++ >= limit) q.waiting.length = 0;
            callback();
        });
    }

    q.retry = function () {
        q.pause();

        if(retryType){
            log('Paused on:', this);
            log('Pause time: ' + fmin.timeDelay(errorTime));
            setTimeout(function () {
                q.resume();
                log('Resumed');
            }, errorTime);
        }
        else {
            setTimeout(function () {
                q.resume();
                //log('Resumed');
            }, 60000 * 15); // minutes
        }
        retryType = false;
    };

    return q;
};
// ******************************************************************************************************************************




