'use strict';
var fs = require('fs');

module.exports = function ($) {
    var b = {};

    try {
        b.type = $('title').text().match(/Individual|Company|Branch/)[0];
        b.name = $('.individual').text().trim();
        if(!b.name) b.name = $('.headerUnIdent p').text().trim(); // e.g: indi 897014
        var table1 = $('table[class="data"]').eq(0);
        b['NMLS ID'] = table1.find('.divider').eq(0).text().trim();
        b['Phone'] = table1.find('.divider').eq(1).text().trim();
        b['Fax'] = table1.find('td').last().text().trim();
        var table2 = $('table').eq(1);
        b['Other Names'] = table2.find('.divider').eq(0).text().trim();
        b['Prior Other Names'] = table2.find('.divider').eq(1).text().trim();
        b['Prior Legal Names'] = table2.find('td').last().text().trim();
        //b['Regulatory Actions'] = $('table').eq(2).find('td').last().text().trim(); see below
// .........................  Employment  ...............................
        b.Employment = {};
        var bEmploy = b.Employment;

        var $Employ = $('.grid_950').has('#ttAuthorizedToRepresent');
        bEmploy['Authorized to Represent'] = $Employ.find('.divider').eq(0).text().trim();
        bEmploy['Engaged in other businesses'] = $Employ.find('.divider').eq(1).text().trim();

        bEmploy.history = [];
        var aHistory = bEmploy.history;
        $Employ.find('table').has('.employment').find('.employment').slice(1).each(function () {
            var bh = {};
            var $tds = $(this).find('td');

            bh.From = $tds.eq(0).text().trim();
            bh.To = $tds.eq(1).text().trim();
            bh.Employer = $tds.eq(2).text().trim();
            bh.Position = $tds.eq(3).text().trim();
            bh.City = $tds.eq(4).text().trim();
            bh.State = $tds.eq(5).text().trim();
            bh['Zip Code'] = $tds.eq(6).text().trim();
            bh['Financial Services'] = $tds.eq(7).text().trim();
            aHistory.push(bh);
        });
// ..........................  Office Locations ......................................
        b['Office Locations'] = []; // null, if empty
        var aOffice = b['Office Locations'];
        $('.grid_950').has('#ttOfficeLocations').find('tr').slice(1).each(function () {
            let $td = $(this).children();
            if ($td.length > 1) {
                let b = {};
                b.Company = $td.eq(0).text().trim();
                b['NMLS ID'] = $td.eq(1).text().trim();
                b.Type = $td.eq(2).text().trim();
                b['Street Address'] = $td.eq(3).text().trim();
                b.City = $td.eq(4).text().trim();
                b.State = $td.eq(5).text().trim();
                b['Zip Code'] = $td.eq(6).text().trim();
                b['Start Date'] = $td.eq(7).text().trim();
                aOffice.push(b);
            }
        });
        if (!aOffice.length) b['Office Locations'] = null;
// ........................... Federal Registration ....................................................
        var $FedReg = $('.grid_950').has('.viewRegistrationDetails');
        if ($FedReg.length) {
            b['Federal Registration'] = {};
            let bFederal = b['Federal Registration'];

            let $FedBegin = $FedReg.find('tr').eq(1).find('td');
            bFederal['Registration Name'] = $FedBegin.eq(0).text().trim();
            bFederal['Status'] = $FedBegin.eq(1).text().trim();
            bFederal['Authorized to Conduct Business'] = $FedBegin.eq(2).text().trim();
            bFederal['Currently Authorized to Represent'] = $FedBegin.eq(3).text().trim();

            let $FedTables = $('.viewRegistrationDetails').find('td').eq(0).children('table');

            bFederal['Currently Authorized to Repr.'] = []; // пустой массив, если нет
            let aCurrently = bFederal['Currently Authorized to Repr.'];
            $FedTables.eq(0).find('td[style]').each(function () {
                let b = {};
                let t = $(this);
                b.Company = $(t.find('span').get(0).nextSibling).text().trim();
                b['Company Legal Name'] = t.find('.blue').text().trim();
                b['NMLS ID'] = t.find('.sponsorshipId').text().trim();
                b['Primary Federal Regulator'] = t.find('.externalLink').attr('href');
                b['Start Date'] = t.contents().last().text().trim();
                aCurrently.push(b);
            });

            bFederal['Previously Authorized to Represent'] = [];  // пустой массив, если нет
            let aPrevious = bFederal['Previously Authorized to Represent'];
            $FedTables.eq(1).find('td[style]').each(function () {
                let b = {};
                let t = $(this);
                b.Company = $(t.find('span').get(0).nextSibling).text().trim();
                b['Company Legal Name'] = t.find('.blue').text().trim();
                b['NMLS ID'] = t.find('.sponsorshipId').text().trim();
                b['Primary Federal Regulator'] = t.find('.externalLink').attr('href');
                b['Start Date'] = t.contents().last().text().trim();
                aPrevious.push(b);
            });

            // Registration History
            bFederal['Registration History'] = []; // пустой массив, если нет
            let aFedHistory = bFederal['Registration History'];
            $FedTables.eq(2).find('#registrationHst').children('div').each(function () {
                let b = {};
                b.Agency = $(this).children('span').last().text().trim();
                b.History = [];
                $(this).next().find('tr').slice(1).each(function () {
                    let bb = {};
                    bb.Start = $(this).children().eq(0).text().trim();
                    bb.End = $(this).children().eq(1).text().trim();
                    bb['Authorized to Conduct Business'] = $(this).children().eq(2).text().trim();
                    b.History.push(bb);
                });
                aFedHistory.push(b);
            });
        }
// ......................... State Licenses/Registrations ......................................
        var $StateLic = $('.grid_950').has('#activeLicenseCount');
        if ($StateLic.length) {

            b['State Licenses/Registrations'] = [];
            let aLicenses = b['State Licenses/Registrations'];

            $StateLic.find('.viewLicense').each(function () {
                let b = {};
                let $idLic = $(this).next();

                let $viewLicense = $(this).find('.viewLicense td');
                b.Regulator = $viewLicense.eq(0).text().trim();
                b['License/Registration Name'] = $viewLicense.eq(1).text().trim();
                b['Authorized to Conduct Business'] = $viewLicense.eq(2).text().trim();
                b['Consumer Complaint'] = $viewLicense.eq(3).find('a').attr('href');

                b['License Details'] = {};
                let bDetails = b['License Details'];
                let $licenseDetails = $idLic.find('table').eq(0).find('td');

                bDetails['Lic/Reg'] = $licenseDetails.eq(0).find('.nowrap').contents().last().text().trim();
                bDetails['Original Issue Date'] = $licenseDetails.eq(1).contents().last().text().trim();
                bDetails.Status = $licenseDetails.eq(3).find('.nowrap').contents().last().text().trim();
                bDetails['Status Date'] = $licenseDetails.eq(4).find('.nowrap').contents().last().text().trim();
                bDetails['Renewed Through'] = $licenseDetails.eq(5).contents().last().text().trim();

                b['Currently Authorized to Represent'] = []; // пустой массив, если пусто
                let aCurrently = b['Currently Authorized to Represent'];
                let $Currently = $idLic.find('.subData').last();
                $Currently.find('tr').eq(1).children('td[style]').each(function () {
                    var b = {};
                    b.Company = $(this).find('a').text().trim();
                    b['NMLS ID'] = $(this).find('.sponsorshipId').text().trim();
                    b['Start Date'] = $(this).contents().last().text().trim();
                    aCurrently.push(b)
                });

                b['Previously Authorized to Represent'] = [];
                let aPrevious = b['Previously Authorized to Represent'];
                $Currently.find('.nonActiveSponsorRow td').each(function () {
                    let NMLSID = $(this).find('.sponsorshipId').text().trim();
                    if (NMLSID) {
                        let b = {};
                        b.Company = $(this).find('a').text().trim();
                        b['NMLS ID'] = NMLSID;
                        b['Start Date'] = $(this).contents().eq(15).text().trim();
                        b['End Date'] = $(this).contents().last().text().trim();
                        aPrevious.push(b);
                    }
                });

                b['License Status History'] = [];
                let statusHist = b['License Status History'];
                $Currently.find('.licenseStatusHst tr').slice(1).each(function () {
                    let el = $(this).find('td');
                    let b = {};
                    b.Start = el.eq(0).text();
                    b.End = el.eq(1).text();
                    b['Authorized to Conduct Business'] = el.eq(2).text();
                    statusHist.push(b);
                });


                aLicenses.push(b);
            });
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

        b['Self-reported Disciplinary Actions'] = [];
        let bSelf = b['Self-reported Disciplinary Actions'];
        let $Self = $('.grid_950').has('#FederalDisciplinaryActions').find('table').eq(1).find('tr[class=fedDiscAction]');
        if (!$Self.length) b['Self-reported Disciplinary Actions'] = null;
        else {
            $Self.each(function () {
                let b = {};
                let $td = $(this).children('td');
                let $table = $(this).next().find('table');

                b['Authority Type'] = $td.eq(0).text().trim();
                b['Action Type'] = $td.eq(1).text().trim();
                b['Date of Action'] = $td.eq(2).text().trim();
                b['Associated Document'] = $td.eq(3).find('a').attr('href');

                b['Name of Authority'] = $table.find('td').eq(0).contents().eq(2).text().trim();
                b['Self-reported Disciplinary Action Detail'] = $table.find('td').eq(2).text().trim();
                b['The individual has answered yes to the following question(s)'] = $table.find('li').text().replace(/\s+/g, ' ').trim();
                bSelf.push(b);
            });
        }
        return b;
// ....................................................................................................
    }
    catch (e) {
        let er = `NMLS ID: ${b['NMLS ID']}\nTYPE: ${b.type}\n${e.stack}`;
        //console.log('');
        //console.error(er);
        let id = b['NMLS ID'] || Math.random().toString(36).slice(2);
        fs.writeFileSync(`./backup/errors/${id}.txt`, er, {encoding: 'utf-8'});
    }


};














