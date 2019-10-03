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
        b['NMLS ID'] = $tableST.children('td').eq(0).find('td').last().text().trim();

        b['Street Address'] = addrss($dataDetail.eq(0).find('td').eq(1).children('span'));
        b['Mailing Address'] = addrss($dataDetail.eq(0).find('td').eq(3).children('span'));
        b['Phone'] = $dataDetail.eq(1).find('td').eq(1).text().trim();
        b['Toll-Free Number'] = $dataDetail.eq(1).find('td').eq(3).text().trim();
        b['Fax'] = $dataDetail.eq(1).find('td').eq(5).text().trim();
        b['Website'] = $dataDetail.eq(2).find('td').eq(1).text().trim();
        b['Email'] = $dataDetail.eq(2).find('td').eq(3).text().trim();

        b['Other Trade Names'] = $('#ttOtherTradeNames').closest('.label').next('td').text().trim();
        b['Prior Other Trade Names'] = $('#ttPriorOtherTradeNames').closest('.label').next('td').text().trim();
        b['Prior Legal Names'] = $('#ttPriorLegalNames').closest('.label').next('td').text().trim();
        b['Sponsored MLOs'] = $('#ttSponsoredMLOs').closest('.label').next('td').text().trim();
        b['Registered MLOs'] = $('#ttRegisteredMLOs').closest('.label').next('td').text().trim(); // только федералы

        let $Fiscal = $('.grid_950').eq(1).children('table').eq(2).find('td');

        b['Fiscal Year End'] = $Fiscal.eq(1).text().trim();
        b['Formed in'] = $Fiscal.eq(3).text().trim();
        b['Date Formed'] = $Fiscal.eq(5).text().trim();
        b['Stock Symbol'] = $Fiscal.eq(7).text().trim();
        b['Business Structure'] = $Fiscal.eq(9).text().trim();
        //b['Regulatory Actions'] = ''; // see below

        b['Branch Locations'] = {};
        let BL = b['Branch Locations'];
        BL.quantity = $('#ttBranchLocations').next().contents().text().replace(/\s+/g, ' ').trim();
        BL.url = $('#ttBranchLocations').next().next().find('a').attr('href'); // undefined, если нет

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

            bDetails['Lic/Reg'] = $licenseDetails.eq(0).find('.nowrap').contents().last().text().trim();
            bDetails['Original Issue Date'] = $licenseDetails.eq(1).contents().last().text().trim();
            bDetails.Status = $licenseDetails.eq(3).find('.nowrap').contents().last().text().trim();
            bDetails['Status Date'] = $licenseDetails.eq(4).find('.nowrap').contents().last().text().trim();
            bDetails['Renewed Through'] = $licenseDetails.eq(5).contents().last().text().trim();
            bDetails['Other Trade Names'] = $licenseDetails2.eq(0).contents().last().text().trim();

            b['License Status History'] = [];
            let statusHist = b['License Status History'];
            $idLic.find('table').eq(1).find('.licenseStatusHst tr').slice(1).each(function () {
                let el = $(this).find('td');
                let b = {};
                b.Start = el.eq(0).text();
                b.End = el.eq(1).text();
                b['Authorized to Conduct Business'] = el.eq(2).text();
                statusHist.push(b);
            });

            b['Resident/Registered Agent for Service of Process'] = {};
            let agent = b['Resident/Registered Agent for Service of Process'];

            let $popupData1 = $idLic.find('.popupData').eq(0).children('tr');
            agent['License/Registration'] = $popupData1.eq(0).find('span').eq(0).contents().last().text().trim();
            agent['Original Issue Date'] = $popupData1.eq(0).find('td').contents().last().text().trim();
            agent['Regulator'] = $popupData1.eq(2).find('span').eq(0).contents().last().text().trim();
            agent['License/Registration Name'] = $popupData1.eq(2).find('td').contents().last().text().trim();

            let $popupData2 = $idLic.find('.popupData').eq(1).children('tr');
            agent['Company'] = $popupData2.eq(2).children('td').eq(1).text().trim();
            agent['Name'] = $popupData2.eq(3).children('td').eq(1).text().trim();
            agent['Title'] = $popupData2.eq(4).children('td').eq(1).text().trim();
            agent['Address'] = $popupData2.eq(5).children('td').eq(1).html();
            if (agent['Address']) agent['Address'] = agent['Address'].replace(/<br>/g, ',').replace(/\s+/g, ' ').trim();
            else agent['Address'] = '';
            agent['Phone'] = $popupData2.eq(6).children('td').eq(1).text().trim();
            agent['Fax'] = $popupData2.eq(7).children('td').eq(1).text().trim();

            aLicenses.push(b);
        });
        // ......................  Federal Registration  .................................

        if ($('#ttFederalRegulator').length) { // не показывает, если нет
            b['Federal Registration'] = {};
            let bFederal = b['Federal Registration'];

            let FedTD = $('table').has('#ttFederalRegulator').find('td');

            bFederal['Primary Federal Regulator'] = FedTD.eq(0).text().trim();
            bFederal['url'] = FedTD.eq(0).find('a').attr('href');
            bFederal['Status'] = FedTD.eq(1).text().trim();
        }
        // ....................................  actions .............................................................

        b['Regulatory Actions'] = [];
        let bReg = b['Regulatory Actions'];
        let $Reg = $('.grid_950').has('#RegulatoryActions').find('table').eq(1).find('tr').slice(1);
        if (!$Reg.length) b['Regulatory Actions'] = null;
        else {
            $Reg.each(function () {
                let b = {};
                let $td = $(this).children('td');
                b.Regulator = $td.eq(0).text().trim();
                b['Action Type'] = $td.eq(1).text().trim();
                b['Date of Action'] = $td.eq(2).text().trim();
                b['Multi-state Action ID'] = $td.eq(3).text().trim();
                b['Docket Number'] = $td.eq(4).text().trim();
                b['Associated Document(s)'] = $td.eq(5).find('a').attr('href');
                bReg.push(b);
            });
        }
        // ............................................................................................................................

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




























