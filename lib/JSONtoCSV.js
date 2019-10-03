'use strict';
var fs = require('fs');
var json2csv = require('json2csv');

module.exports = function(TYPE) { // individual   branch     company
    if (TYPE == 'individual') var csvGen = require('./CSV_individual.js');
    else if (TYPE == 'branch') csvGen = require('./CSV_branch.js');
    else if (TYPE == 'company') csvGen = require('./CSV_company.js');

    var pJson = `./_result/JSON/${TYPE}/`;
    var pSave = `./_result/CSV/${TYPE}/`;

    var nFiles = fs.readdirSync(pJson).length; // The number of files in a directory
    for (var i = 1; i <= nFiles; i++) {
        var aJSON = JSON.parse(fs.readFileSync(`${pJson}${i}.json`, {encoding: 'utf-8'}));
        var jsn = aJSON.map(b=> csvGen(b));
        fs.writeFileSync(`${pSave}${i}.csv`, json2csv({ data: jsn}), {encoding: 'utf-8'});
        console.log(`The file is saved: ${TYPE}/${i}.csv`);
    }
};











