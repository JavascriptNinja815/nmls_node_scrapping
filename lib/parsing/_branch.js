'use strict';
var fs = require('fs');

module.exports = function ($) {
    var b = {};
    try {
        b.type = $('title').text().match(/Individual|Company|Branch/)[0];
        b.name = $('.company').text().trim();
        if(!b.name) b.name = $('.headerUnIdent p').text().trim();
        let $tableST = $('table[class="data"]').eq(0).find('tr').eq(0);
        let $dataDetail = $tableST.find('.dataDetail');
        b['NMLS ID'] = $tableST.children('td').eq(1).text().trim();

        b['Street Address'] = addrss($dataDetail.eq(0).find('td').eq(1).children('span'));
        b['Mailing Address'] = addrss($dataDetail.eq(0).find('td').eq(3).children('span'));
        b['Phone'] = $dataDetail.eq(1).find('td').eq(1).text().trim();
        b['Fax'] = $dataDetail.eq(1).find('td').eq(3).text().trim();
        b['Website'] = $dataDetail.eq(2).find('td').eq(1).text().trim();
        b['Email'] = $dataDetail.eq(2).find('td').eq(3).text().trim();
        b['Other Trade Names'] = $('#ttOtherTradeNames').closest('.label').next('td').text().trim();
        b['Prior Other Trade Names'] = $('#ttPriorOtherTradeNames').closest('.label').next('td').text().trim();

        // ..............................  Manager(s)  .........................................

        b.Managers = []; // пустой массив, если никого нет (None)
        $('table').has('#ttIndustryBranchManagers').find('tr').slice(1).each(function () {
            let bb = {};
            let $tds = $(this).children('td');
            bb['Branch Manager(s)'] = $tds.eq(0).text().trim();
            bb['NMLS ID'] = $tds.eq(1).text().trim();
            bb['Industry'] = $tds.eq(2).text().trim();
            bb['url'] = 'http://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/' + bb['NMLS ID'];
            if (bb['Branch Manager(s)'] !== 'None')   b.Managers.push(bb);
        });

        // ......................  State Licenses/Registrations .................................

        b['State Licenses/Registrations'] = [];
        let aLicenses = b['State Licenses/Registrations'];

        $('.viewLicense').each(function () {
            let b = {};
            let $idLic = $(this).next();

            let $viewLicense = $(this).children('td');
            b.Regulator = $viewLicense.eq(0).text().trim();
            b['License/Registration Name'] = $viewLicense.eq(1).text().trim();
            b['Authorized to Conduct Business'] = $viewLicense.eq(2).text().trim();
            b['Consumer Complaint'] = $viewLicense.eq(3).find('a').attr('href');

            b['License Details'] = {};
            let bDetails = b['License Details'];
            let $licenseDetails = $idLic.find('table').eq(0).find('td');
            let $licenseDetails2 = $idLic.find('table').eq(1).find('td');
            let $licenseDetails3 = $idLic.find('table').eq(2).find('td');

            bDetails['Lic/Reg'] = $licenseDetails.eq(0).find('.nowrap').contents().last().text().trim();
            bDetails['Original Issue Date'] = $licenseDetails.eq(1).contents().last().text().trim();
            bDetails.Status = $licenseDetails2.eq(0).find('.nowrap').contents().last().text().trim();
            bDetails['Status Date'] = $licenseDetails2.eq(1).find('.nowrap').contents().last().text().trim();
            bDetails['Renewed Through'] = $licenseDetails2.eq(2).contents().last().text().trim();
            bDetails['Other Trade Names'] = $licenseDetails3.eq(0).contents().last().text().trim();


            b['License Status History'] = [];
            let statusHist = b['License Status History'];
            let $licenseDetails4 = $idLic.find('table').eq(3).find('td');
            $licenseDetails4.find('.licenseStatusHst tr').slice(1).each(function () {
                let el = $(this).find('td');
                let b = {};
                b.Start = el.eq(0).text();
                b.End = el.eq(1).text();
                b['Authorized to Conduct Business'] = el.eq(2).text();
                statusHist.push(b);
            });


            aLicenses.push(b);
        });

        return b;
    }
    catch (e) {
        let er = `NMLS ID: ${b['NMLS ID']}\nTYPE: ${b.type}\n${e.stack}`;
        //console.log('');
        //console.error(er);
        let id = b['NMLS ID'] || Math.random().toString(36).slice(2);
        fs.writeFileSync(`./backup/errors/${id}.txt`, er, {encoding: 'utf-8'});
    }

    function addrss($els) {
        let str = '';
        $els.each(function () {str += $(this).text().trim() + ', '});
        return str.slice(0, -2);
    }
};