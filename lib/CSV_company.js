'use strict';
module.exports = function (o) {
    var b = {};
    b.type = o.type;
    b.name = o.name;
    b['NMLS_ID'] = o['NMLS ID'];
    b['Street_Address'] = o['Street Address'];
    b['Mailing_Address'] = o['Mailing Address'];
    b['Phone'] = o['Phone'];
    b['TollFree_Number'] = o['Toll-Free Number'];
    b['Fax'] = o['Fax'];
    b['Website'] = o['Website'];
    b['Email'] = o['Email'];
    b['Other_Trade_Names'] = o['Other Trade Names'];
    b['Prior_Other_Trade_Names'] = o['Prior Other Trade Names'];
    b['Prior_Legal_Names'] = o['Prior Legal Names'];
    b['Sponsored_MLOs'] = o['Sponsored MLOs'];
    b['Registered_MLOs'] = o['Registered MLOs'];
    b['Fiscal_Year_End'] = o['Fiscal Year End'];
    b['Formed_in'] = o['Formed in'];
    b['Date_Formed'] = o['Date Formed'];
    b['Stock_Symbol'] = o['Stock Symbol'];
    b['Business_Structure'] = o['Business Structure'];


    // ...................................  Branch Locations ....................... ...............................

    b['Branch_Locations'] = JSON.stringify(o['Branch Locations']);

    /*  b['Branch_Locations'] = '';
     let BL = o['Branch Locations'];
     if (BL.quantity && BL.quantity != 'No Branch Locations in NMLS') b['Branch_Locations'] = `Quantity: ${BL.quantity}, URL: ${BL.url}`;

     */ // .................................. State Licenses/Registrations ......................................


    b['State_LicensesRegistrations'] = JSON.stringify(o['State Licenses/Registrations']);

    /*    b['State_LicensesRegistrations'] = '';
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

     s += `Resident/Registered Agent for Service of Process": `;
     let bAgent = bLis['Resident/Registered Agent for Service of Process'];
     s += `Lic/Reg: ${bAgent['License/Registration']}, `;
     s += `Original Issue Date: ${bAgent['Original Issue Date']}, `;
     s += `Regulator: ${bAgent['Regulator']}, `;
     s += `License/Registration Name: ${bAgent['License/Registration Name']}, `;
     s += `Company: ${bAgent['Company']}, `;
     s += `Name: ${bAgent['Name']}, `;
     s += `Title: ${bAgent['Title']}, `;
     s += `Address: ${bAgent['Address']}, `;
     s += `Phone: ${bAgent['Phone']}, `;
     s += `Fax: ${bAgent['Fax']}`;

     b['State_LicensesRegistrations'] += s + ' ||| ';
     });
     b['State_LicensesRegistrations'] = b['State_LicensesRegistrations'].slice(0, -4);
     }*/

    // .................................. Federal Registration ......................................

    let bFed = o['Federal Registration'];
    if (!bFed)b['Federal_Registration'] = JSON.stringify({});
    else b['Federal_Registration'] = JSON.stringify(bFed) ;


    /*    b['Federal_Registration'] = '';
     let bFed = o['Federal Registration'];
     if (bFed) {
     let s = `Primary Federal Regulator: ${bFed['Primary Federal Regulator']}, `;
     s += `Status: ${bFed['Status']}, `;
     s += `url: ${bFed['url']}`;
     b['Federal_Registration'] = s;
     }*/
    // .................................... actions .........................................................

    let oReg = o['Regulatory Actions'];
    if (oReg) b['Regulatory_Actions'] = JSON.stringify(oReg);
    else b['Regulatory_Actions'] = JSON.stringify([]);


/*        b['Regulatory_Actions'] = '';
    let bRegAct = o['Regulatory Actions'];
    if (bRegAct) {
        b['Regulatory_Actions'] = bRegAct.map(bb=> {
            let s = `Regulator: ${bb['Regulator']}, `;
            s += `Action Type: ${bb['Action Type']}, `;
            s += `Date of Action': ${bb['Date of Action']}, `;
            s += `Multi-state Action ID': ${bb['Multi-state Action ID']}, `;
            s += `Docket Number': ${bb['Docket Number']}, `;
            s += `Associated Document(s)': ${bb['Associated Document(s)']}`;
            return s;
        }).join(' || ');
    }*/

    // ......................................................................................................

    return b;
};


