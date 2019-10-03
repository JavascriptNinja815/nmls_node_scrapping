'use strict';
var fs = require('fs'), JSONC = require('json-comments');
var c = JSONC.parse(fs.readFileSync('./config.json', {encoding: 'utf-8'}));
console.log(`\nMaximum nmls ID: ${c.maxID}\n`);

// nmlsIndexOne nmlsIndexOne3 nmlsIndexMini nmlsIndex   nmlsIndexZero
var a = JSON.parse(fs.readFileSync(`${__dirname}/nmlsIndex.json`, {encoding: 'utf-8'}));
if (a.length) var nMax = Number(a[a.length - 1].split('/').pop()) + 1; // +1 for loop
else nMax = 1;

// .............................................................................................

module.exports = function (q) { // q, log
    a.forEach(s=> q.push(s));
    for (let i = nMax; i <= c.maxID; i++) q.push(`/INDIVIDUAL/${i}`);
    //for (let i = 3351; i <= 3351 + 100; i++) q.push(`/INDIVIDUAL/${i}`);
    //for (let i = 3445; i <= 3445 + 3; i++) q.push(`/INDIVIDUAL/${i}`);


    //log(`${nMax}, ${c.maxID}`);
};
