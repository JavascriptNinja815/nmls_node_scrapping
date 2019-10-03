// Merging files
var megabytesMax = 150; // the number of megabytes, if exceeded, merge

// ********************************************************************************************************************

module.exports = function(type) { // individual  branch   company
    var fs = require('fs');
    var p = `./backup/rawJson/${type}/`;
    var nFiles = fs.readdirSync(p).length; // the number of files in a directory
    var p2 = `./_result/JSON/${type}/`;
    var n = 0; // count the number of records
    var arr = [];
    var nameFile = 1;
    var sumMegabytes = 0; // The current amount of megabytes

    for (var i = 1; i <= nFiles; i++) {
        var currP = `${p}${i}.json`;
        var a = JSON.parse(fs.readFileSync(currP, {encoding: 'utf-8'}));
        arr = arr.concat(a);
        sumMegabytes += fs.statSync(currP).size / 1048576;

        if (sumMegabytes > megabytesMax || i == nFiles) {
            fs.writeFileSync(`${p2}${nameFile}.json`, JSON.stringify(arr, null, 1), {encoding: 'utf-8'});
            arr.length = sumMegabytes = 0;
            console.log(`The file is saved: ${type}/${nameFile}.json`);
            nameFile++;
        }
        n += a.length;
    }

    console.log(`Total ${type}: ${n}`);

};






