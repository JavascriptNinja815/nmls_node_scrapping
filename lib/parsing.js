'use strict';
var fs = require('fs');
//individual|branch|company
var _individual = require(`${__dirname}/parsing/_individual.js`);
var _branch = require(`${__dirname}/parsing/_branch.js`);
var _company = require(`${__dirname}/parsing/_company.js`);

if (!fs.existsSync('./backup')) fs.mkdirSync('./backup');
if (!fs.existsSync('./backup/rawJson')) fs.mkdirSync('./backup/rawJson');
if (!fs.existsSync('./backup/rawJson/individual')) fs.mkdirSync('./backup/rawJson/individual');
if (!fs.existsSync('./backup/rawJson/branch')) fs.mkdirSync('./backup/rawJson/branch');
if (!fs.existsSync('./backup/rawJson/company')) fs.mkdirSync('./backup/rawJson/company');
if (!fs.existsSync('./backup/errors')) fs.mkdirSync('./backup/errors');

var aIndividual = [], aBranch = [], aCompany = [];
var iIndividual = fs.readdirSync('./backup/rawJson/individual').length + 1; // number of files
var iBranch = fs.readdirSync('./backup/rawJson/branch').length + 1;
var iCompany = fs.readdirSync('./backup/rawJson/company').length + 1;

//*********************************************************************************************************************************

exports.parse = function ($, type) { // called from a1.js
    if (type == 'INDIVIDUAL') {
        let d = _individual($);
        if (d) aIndividual.push(d);
    }
    else if (type == 'BRANCH') {
        let d = _branch($);
        if (d)  aBranch.push(d);
    }
    else if (type == 'COMPANY') {
        let d = _company($);
        if (d)   aCompany.push(d);
    }
};

//*********************************************************************************************************************************

exports.save = function () { // called from backup.js and a1.js
    if (aIndividual.length) {
        fs.writeFileSync(`./backup/rawJson/individual/${iIndividual++}.json`, JSON.stringify(aIndividual, null, 1), {encoding: 'utf-8'});
        aIndividual.length = 0;
    }

    if (aBranch.length) {
        fs.writeFileSync(`./backup/rawJson/branch/${iBranch++}.json`, JSON.stringify(aBranch, null, 1), {encoding: 'utf-8'});
        aBranch.length = 0;
    }
    if (aCompany.length) {
        fs.writeFileSync(`./backup/rawJson/company/${iCompany++}.json`, JSON.stringify(aCompany, null, 1), {encoding: 'utf-8'});
        aCompany.length = 0;
    }
};

//*********************************************************************************************************************************

