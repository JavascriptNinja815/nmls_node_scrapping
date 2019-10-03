'use strict';
var fs = require('fs');
var json4 = require('./lib/toJSON4.js');
var JSONtoCSV = require('./lib/JSONtoCSV.js');

if (!fs.existsSync('./_result')) fs.mkdirSync('./_result');

if (!fs.existsSync('./_result/JSON')) fs.mkdirSync('_result/JSON');
if (!fs.existsSync('./_result/CSV')) fs.mkdirSync('./_result/CSV');

if (!fs.existsSync('./_result/JSON/individual')) fs.mkdirSync('./_result/JSON/individual');
if (!fs.existsSync('./_result/JSON/branch')) fs.mkdirSync('./_result/JSON/branch');
if (!fs.existsSync('./_result/JSON/company')) fs.mkdirSync('./_result/JSON/company');

if (!fs.existsSync('./_result/CSV/individual')) fs.mkdirSync('./_result/CSV/individual');
if (!fs.existsSync('./_result/CSV/branch')) fs.mkdirSync('./_result/CSV/branch');
if (!fs.existsSync('./_result/CSV/company')) fs.mkdirSync('./_result/CSV/company');

if (!fs.existsSync('./backup/rawJson/individual')) throw "Not Found catalog: ./backup/rawJson/individual";
if (!fs.existsSync('./backup/rawJson/branch')) throw "Not Found catalog: ./backup/rawJson/branch";
if (!fs.existsSync('./backup/rawJson/company')) throw "Not Found catalog: ./backup/rawJson/company";

// ************************************************************************************************************

json4('individual');
json4('branch');
json4('company');

// ************************************************************************************************************

JSONtoCSV('individual');
JSONtoCSV('branch');
JSONtoCSV('company');

// ************************************************************************************************************

console.log('\n\nThe data is stored in the directory: "_result"\n\n');