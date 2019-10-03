var fs = require('fs');
var csv = require('json2csv');

module.exports = function(c, results) {
    if (c.consol) console.log(results);
    if (c.json) fs.writeFileSync('data.json', JSON.stringify(results, null, 4));
    if (c.csv) fs.writeFileSync('data.csv', csv({ data: results}), {encoding: 'utf-8'});
};



