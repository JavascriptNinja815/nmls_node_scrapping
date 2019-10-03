'use strict';
module.exports = function (o) {
    var b = {};
    b.type = o.type;
    b.name = o.name;
    b['NMLS_ID'] = o['NMLS ID'];
    b['Street_Address'] = o['Street Address'];
    b['Mailing_Address'] = o['Mailing Address'];
    b['Phone'] = o['Phone'];
    b['Fax'] = o['Fax'];
    b['Website'] = o['Website'];
    b['Email'] = o['Email'];
    b['Other_Trade_Names'] = o['Other Trade Names'];
    b['Prior_Other_Trade Names'] = o['Prior Other Trade Names'];

    // ...................................  Manager(s) ....................... ...............................

    b.Managers = JSON.stringify(o.Managers);

/*    b.Managers = '';
    if (o.Managers != 'None') {
        b.Managers = o.Managers.map(bb=> {
            let s = `Branch_Manager: ${bb['Branch Manager(s)']}, `;
            s += `NMLS_ID: ${bb['NMLS ID']}, `;
            s += `Industry: ${bb['Industry']}, `;
            s += `url: ${bb['url']}`;
            return s;
        }).join(' || ');
    }*/

    // .................................. State Licenses/Registrations ......................................

    b['State_LicensesRegistrations']  = JSON.stringify(o['State Licenses/Registrations']);

    /*b['State_LicensesRegistrations'] = '';
    if (o['State Licenses/Registrations']) {
        o['State Licenses/Registrations'].forEach(bLis=> {
            let s = `Regulator: ${bLis['Regulator']}, `;
            s += `License/Registration Name: ${bLis['License/Registration Name']}, `;
            s += `Authorized to Conduct Business: ${bLis['Authorized to Conduct Business']}, `;
            s += `Consumer Complaint: ${bLis['Consumer Complaint']}, `;
            let bDet = bLis['License Details'];
            s += `Lic/Reg: ${bDet['Lic/Reg']}, `;
            s += `Original Issue Date: ${bDet['Original Issue Date']}, `;
            s += `Status: ${bDet['Status']}, `;
            s += `Status Date: ${bDet['Status Date']}, `;
            s += `Renewed Through: ${bDet['Renewed Through']}, `;
            s += `Other Trade Names: ${bDet['Other Trade Names']}, `;

            s += `License Status History": `;
            let ss = bLis['License Status History'].map(b=> {
                let s = `${b['Start']} - ${b['End']}, `;
                s += `Authorized to Conduct Business: ${b['Authorized to Conduct Business']}`;
                return s;
            }).join(' | ');

            if (ss) s += `${ss}. `; else s += "none. ";
            b['State_LicensesRegistrations'] += s + ' ||| ';
        });
        b['State_LicensesRegistrations'] = b['State_LicensesRegistrations'].slice(0, -4);
    }*/

    // ......................................................................................................

    return b;
};
























