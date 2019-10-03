'use strict';
module.exports = function (o) {
    var b = {};
    b.type = o.type;
    b.name = o.name;
    b['NMLS_ID'] = o['NMLS ID'];
    b['Phone'] = o['Phone'];
    b['Fax'] = o['Fax'];
    b['Other_Names'] = o['Other Names'];
    b['Prior_Other_Names'] = o['Prior Other Names'];
    b['Prior_Legal_Names'] = o['Prior Legal Names'];

    // .........................  Employment  ...............................

    b['EMPLOYMENT__Authorized_to_Represent'] = o['Employment']['Authorized to Represent'];
    b['EMPLOYMENT__Engaged_in_other_businesses'] = o['Employment']['Engaged in other businesses'];
    b['EMPLOYMENT__history'] = JSON.stringify(o['Employment']['history']);

    /*    b['EMPLOYMENT__history'] = o['Employment']['history'].map(b=> {
     let s = `${b.From} - ${b.To}, `;
     s += `Employer: ${b.Employer}, `;
     s += `Position: ${b.Position}, `;
     s += `Financial Services: ${b['Financial Services']}, `;
     s += `Address: ${b.City}, ${b.State}, ${b['Zip Code']}`;
     return s;
     }).join(' || ');*/

    // ..........................  Office Locations ......................................

    let offLoc = o['Office Locations'];
    if (!offLoc) b['Office_Locations'] = JSON.stringify([]);
    else b['Office_Locations'] = JSON.stringify(offLoc);

    /*    let offLoc = o['Office Locations'];
     if (offLoc) {
     b['Office_Locations'] = offLoc.map(b=> {
     let s = `Company: ${b.Company}, `;
     s += `NMLS ID: ${b['NMLS ID']}, `;
     s += `Type: ${b.Type}, `;
     s += `Start Date: ${b['Start Date']}, `;
     s += `Address: ${b['Street Address']}, ${b.City}, ${b.State}, ${b['Zip Code']}`;
     return s;
     }).join(' || ');
     }
     else b['Office_Locations'] = '';*/

    // ........................... Federal Registration ....................................................

    b['Federal_Registration'] = JSON.stringify({});
    b['FederalRegistration__Currently_Authorized_to_Represent'] = JSON.stringify([]);
    b['FederalRegistration__Previously_Authorized_to_Represent'] = JSON.stringify([]);
    b['FederalRegistration__Registration_History'] = JSON.stringify([]);

    if (o['Federal Registration']) {
        let bFed = o['Federal Registration'];
        b['Federal_Registration'] = {
            "Registration Name": bFed['Registration Name'],
            "Status": bFed['Status'],
            "Authorized to Conduct Business": bFed['Authorized to Conduct Business'],
            "Currently Authorized to Represent": bFed['Currently Authorized to Represent']
        };
        b['Federal_Registration'] = JSON.stringify(b['Federal_Registration']);
        b['FederalRegistration__Currently_Authorized_to_Represent'] = JSON.stringify(bFed['Currently Authorized to Repr.']);
        b['FederalRegistration__Previously_Authorized_to_Represent'] = JSON.stringify(bFed['Previously Authorized to Represent']);
        b['FederalRegistration__Registration_History'] = JSON.stringify(bFed['Registration History']);
    }

    /*    b['Federal_Registration'] = '';
     b['FederalRegistration__Currently_Authorized_to_Represent'] = '';
     b['FederalRegistration__Previously_Authorized_to_Represent'] = '';
     b['FederalRegistration__Registration_History'] = '';

     if (o['Federal Registration']) {

     let bFed = o['Federal Registration'];

     let s = `Registration Name: ${bFed['Registration Name']}, `;
     s += `Status: ${bFed['Status']}, `;
     s += `Authorized to Conduct Business: ${bFed['Authorized to Conduct Business']}`;
     b['Federal_Registration'] = s;

     b['FederalRegistration__Currently_Authorized_to_Represent'] = bFed['Currently Authorized to Repr.'].map(b=> {
     let s = `Company: ${b.Company}, `;
     s += `Company Legal Name: ${b['Company Legal Name']}, `;
     s += `NMLS ID: ${b['NMLS ID']}, `;
     s += `Primary Federal Regulator: ${b['Primary Federal Regulator']}, `;
     s += `Start Date: ${b['Start Date']}`;
     return s;
     }).join(' || ');

     b['FederalRegistration__Previously_Authorized_to_Represent'] = bFed['Previously Authorized to Represent'].map(b=> {
     let s = `Company: ${b.Company}, `;
     s += `Company Legal Name: ${b['Company Legal Name']}, `;
     s += `NMLS ID: ${b['NMLS ID']}, `;
     s += `Primary Federal Regulator: ${b['Primary Federal Regulator']}, `;
     s += `Start Date: ${b['Start Date']}`;
     return s;
     }).join(' || ');

     b['FederalRegistration__Registration_History'] = bFed['Registration History'].map(b=> {
     let s = `Agency: ${b.Agency}, History: `;
     s += b['History'].map(b=> {
     return `${b.Start} - ${b.End}, Authorized to Conduct Business: ${b['Authorized to Conduct Business']}`;
     }).join('; ');
     return s;
     }).join(' || ');
     }*/
    // .................................. State Licenses/Registrations ......................................

    let oLis = o['State Licenses/Registrations'];
    if (oLis) b['State_LicensesRegistrations'] = JSON.stringify(oLis);
    else b['State_LicensesRegistrations'] = JSON.stringify([]);

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

     s += `"Currently Authorized to Represent": `;
     let ss = bLis['Currently Authorized to Represent'].map(b=> {
     let s = `Company: ${b['Company']}, `;
     s += `NMLS ID: ${b['NMLS ID']}, `;
     s += `Start Date: ${b['Start Date']}`;
     return s;
     }).join(' | ');
     if (ss) s += `${ss}. `; else s += "none. ";

     s += `Previously Authorized to Represent": `;
     ss = bLis['Previously Authorized to Represent'].map(b=> {
     let s = `Company: ${b['Company']}, `;
     s += `NMLS ID: ${b['NMLS ID']}, `;
     s += `${b['Start Date']} - ${b['End Date']}`;
     return s;
     }).join(' | ');
     if (ss) s += `${ss}. `; else s += "none. ";

     s += `License Status History": `;
     ss = bLis['License Status History'].map(b=> {
     let s = `${b['Start']} - ${b['End']}, `;
     s += `Authorized to Conduct Business: ${b['Authorized to Conduct Business']}`;
     return s;
     }).join(' | ');
     if (ss) s += `${ss}. `; else s += "none. ";
     b['State_LicensesRegistrations'] += s + ' ||| ';
     });
     b['State_LicensesRegistrations'] = b['State_LicensesRegistrations'].slice(0, -4);
     }*/
    // .................................... actions .........................................................

    let oReg = o['Regulatory Actions'];
    if (oReg) b['Regulatory_Actions'] = JSON.stringify(oReg);
    else b['Regulatory_Actions'] = JSON.stringify([]);

/*    b['Regulatory_Actions'] = '';
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

    let oSel = o['Self-reported Disciplinary Actions'];
    if (oSel) b['SelfReported_Disciplinary_Actions'] = JSON.stringify(oSel);
    else b['SelfReported_Disciplinary_Actions'] = JSON.stringify([]);


/*    b['SelfReported_Disciplinary_Actions'] = '';
    let bSelfAct = o['Self-reported Disciplinary Actions'];
    if (bSelfAct) {
        b['SelfReported_Disciplinary_Actions'] = bSelfAct.map(bb=> {
            let s = `Authority Type: ${bb['Authority Type']}, `;
            s += `Action Type: ${bb['Action Type']}, `;
            s += `Date of Action: ${bb['Date of Action']}, `;
            s += `Associated Document: ${bb['Associated Document']}, `;
            s += `Name of Authority: ${bb['Name of Authority']}, `;
            s += `Self-reported Disciplinary Action Detail: ${bb['Self-reported Disciplinary Action Detail']}, `;
            s += `The individual has answered yes to the following question(s): ${bb['The individual has answered yes to the following question(s)'].replace(/\s+/g, ' ')}`;
            return s;
        }).join(' || ');
    }*/
    // ......................................................................................................

    return b;
};


























