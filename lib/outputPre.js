module.exports = function(c) {
    var sfiles = '';
    if (c.json) sfiles += '   data.json   ';
    if (c.csv) sfiles += '   data.csv   ';
    if (c.excel) sfiles += '   data.excel';
    if (!c.json && !c.csv && !c.excel) console.log('\nThe result will not be saved !');
    else  console.log('\nResult will be in the file: ' + sfiles);
    console.log('\n');
};
