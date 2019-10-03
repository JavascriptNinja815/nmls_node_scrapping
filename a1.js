var limit = 0; //  limit loops (records)  // 0 - no limit
var chee = true; // возращать cheerio-объект, false - отключает cheerioПарсинг
var backup = true, backupPeriod = 5000;
var delay = 1000 * 10; // delay_if_error_ms
var htmlSave = false;

var fs = require('fs'), JSONC = require('json-comments');
var cnf = JSONC.parse(fs.readFileSync('./config.json', {encoding: 'utf-8'}));
var threads = cnf.threads; // number_of_threads

var getIndexes = require('./lib/nmlsIndex/getIndexes.js'), parsing = require('./lib/parsing.js');
var proxy = require('./lib/proxy.js');

var log = require('./lib/modules/cllc2')(); //  log.step();  log.step(0, 1);
log.start('Individual: %s, Company: %s, Branch: %s, Current ID: %s'); // 'Found %s, Found dog %s'

var back = require('./lib/backup.js');
var results = [];

// ********************************************************************************************************************************
module.exports = function () {
    var q = require('./js/i_standart.js')(sc_1, threads, delay, limit, back, results, chee, log);
    if (back.getData(q, results, backup, backupPeriod, __filename)) {
        getIndexes(q, log); // for test []
    }
    q.drain = function () {
        parsing.save();
        log.finish();
        back.saveCopy(q, results);
        console.log('\nAll data were obtained.\nClick on _2_get_JSON_CSV.bat file to get JSON and CSV\n');
        console.log('For a new scraping remove directory "backup"');
    };
    // .........................................................................................................................
    function sc_1($, url, html, callback) { // $, url_or_b, html
        var id = Number(url.split('/').pop()); // id file from the current url
        var type = url.match(/INDIVIDUAL|BRANCH|COMPANY/)[0];
        if (/Consumer Access - Branch|Consumer Access - Company|Consumer Access - Individual/.test(html)) {
            if (htmlSave) {
                var dir = Math.floor(id / 100000) + '/';
                // fs.writeFileSync(`F:/_scrapingArchive/_nmls/htm2/${dir}${id}.htm`, html, {encoding: 'utf-8'});
                fs.writeFileSync(`F:/test/${dir}${id}.htm`, html, {encoding: 'utf-8'});
            }

            parsing.parse($, type);

            if (type == 'INDIVIDUAL')  log.step();
            else if (type == 'COMPANY')  log.step(0, 1);
            else if (type == 'BRANCH')  log.step(0, 0, 1);
            log.step(0, 0, 0, id);
        }
        else if (/<title>Object moved/.test(html)) { // no data, add url COMPANY or BRANCH
            if (type == 'INDIVIDUAL') q.unshift(`/COMPANY/${id}`);
            else if (type == 'COMPANY') q.unshift(`/BRANCH/${id}`);
        }
        else if ($('title').text().trim() == 'WebLock') {
            log('Website update license information.');
            log('Pause: 15 minutes');
            callback(true);
        }
        else {
            if(cnf.proxyOn){
                log("Wrong server response, Searching for a new proxy ...");
                proxy(15000, q); // 15 sec
            }
            else throw "Wrong server response" + url;
        }

    }


// ********************************************************************************************************************************
};




