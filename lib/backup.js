var dirPath = './backup', filePath;
var fs = require('fs'), parsing = require('./parsing.js');
var backupPeriod, i = 1;
var backup_allowed = false;



// ********************************************************************************************************************************

exports.getData = function (q, results, allowed, bPeriod, filename) {
    filePath = dirPath + '/' + filename.split(/[\\/]/).pop() + 'on'; // ./backup/a1.json
    backupPeriod = bPeriod;
    backup_allowed = allowed;

    if (!backup_allowed) { // if backup disabled
        remove(); // delete temp-file
        return true; // if backup disabled
    }
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath); // create directory
    if (!fs.existsSync(filePath)) return true;

    var s = fs.readFileSync(filePath, {encoding: 'utf-8'});
    var b = JSON.parse(s);

    if(!b.wait.length){
        console.log('\n\nAll data were obtained.\nClick on _2_get_JSON_CSV.bat file to get JSON and CSV\n');
        console.log('For a new scraping remove directory "backup"');
    }


    b.results.forEach(it => results.push(it));
    b.wait.forEach(it => q.push(it));
    return false;
};
// ********************************************************************************************************************************
exports.remove = remove;
function remove() {if (fs.existsSync(filePath)) fs.unlinkSync(filePath)}
// ********************************************************************************************************************************

exports.saveCopy = function (q, results) {
    if (i++ % (backupPeriod + 1) && (q.waiting.length || q.active.length)) return;
    if (!backup_allowed) return;

    var wait = q.active.map(b=> b.data);
    q.waiting.forEach(b=> wait.push(b.data));

    var b = {wait: wait, results: results};
    fs.writeFileSync(filePath, JSON.stringify(b, null, 4), {encoding: 'utf-8'});
    parsing.save();
};



