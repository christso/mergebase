var data = [
    {
        "ID": [
            "13474985"
        ],
        "Name": [
            "Bob The Builders"
        ],
        "Address": [
            "120 Epping Rd\n"
        ],
        "City": [
            "LANE COVE"
        ],
        "Region": [
            "NSW"
        ],
        "PostCode": [
            "2066"
        ],
        "Country": [
            "Australia"
        ],
        "PostalAddress": [
            ""
        ],
        "PostalCity": [
            ""
        ],
        "PostalRegion": [
            ""
        ],
        "PostalPostCode": [
            ""
        ],
        "PostalCountry": [
            ""
        ],
        "Phone": [
            ""
        ],
        "Fax": [
            ""
        ],
        "Website": [
            "bobthebuilders.com"
        ],
        "ReferralSource": [
            "Facebook"
        ],
        "ExportCode": [
            ""
        ],
        "IsProspect": [
            "No"
        ],
        "IsArchived": [
            "No"
        ],
        "IsDeleted": [
            "No"
        ],
        "TaxNumber": [
            ""
        ],
        "CompanyNumber": [
            ""
        ],
        "BusinessNumber": [
            ""
        ],
        "BranchNumber": [
            "1"
        ],
        "BusinessStructure": [
            "Company"
        ],
        "GSTRegistered": [
            "No"
        ],
        "PrepareGST": [
            "No"
        ],
        "SignedTaxAuthority": [
            "No"
        ],
        "AgencyStatus": [
            "Unlinked"
        ],
        "PrepareActivityStatement": [
            "No"
        ],
        "PrepareTaxReturn": [
            "No"
        ],
        "ActiveAtoClient": [
            "No"
        ],
        "Contacts": [
            ""
        ]
    },
    {
        "ID": [
            "13282742"
        ],
        "Name": [
            "EntityProcess"
        ],
        "Address": [
            ""
        ],
        "City": [
            ""
        ],
        "Region": [
            ""
        ],
        "PostCode": [
            ""
        ],
        "Country": [
            ""
        ],
        "PostalAddress": [
            ""
        ],
        "PostalCity": [
            ""
        ],
        "PostalRegion": [
            ""
        ],
        "PostalPostCode": [
            ""
        ],
        "PostalCountry": [
            ""
        ],
        "Phone": [
            ""
        ],
        "Fax": [
            ""
        ],
        "Website": [
            ""
        ],
        "ReferralSource": [
            ""
        ],
        "ExportCode": [
            ""
        ],
        "IsProspect": [
            "No"
        ],
        "IsArchived": [
            "No"
        ],
        "IsDeleted": [
            "No"
        ],
        "Contacts": [
            ""
        ]
    },
    {
        "ID": [
            "13474989"
        ],
        "Name": [
            "Gates, Bill"
        ],
        "Title": [
            "MR"
        ],
        "Gender": [
            "M"
        ],
        "FirstName": [
            "Bill"
        ],
        "LastName": [
            "Gates"
        ],
        "Email": [
            "billgates@gmail.com"
        ],
        "DateOfBirth": [
            "1964-07-11T00:00:00"
        ],
        "Address": [
            "1 Epping Rd\n"
        ],
        "City": [
            "NORTH RYDE"
        ],
        "Region": [
            "NSW"
        ],
        "PostCode": [
            "2113"
        ],
        "Country": [
            "Australia"
        ],
        "PostalAddress": [
            ""
        ],
        "PostalCity": [
            ""
        ],
        "PostalRegion": [
            ""
        ],
        "PostalPostCode": [
            ""
        ],
        "PostalCountry": [
            ""
        ],
        "Phone": [
            "0444123123"
        ],
        "Fax": [
            ""
        ],
        "Website": [
            "microsoft.com"
        ],
        "ReferralSource": [
            ""
        ],
        "ExportCode": [
            ""
        ],
        "IsProspect": [
            "No"
        ],
        "IsArchived": [
            "No"
        ],
        "IsDeleted": [
            "No"
        ],
        "TaxNumber": [
            ""
        ],
        "CompanyNumber": [
            ""
        ],
        "BusinessNumber": [
            ""
        ],
        "BranchNumber": [
            "1"
        ],
        "BusinessStructure": [
            "Individual"
        ],
        "GSTRegistered": [
            "No"
        ],
        "PrepareGST": [
            "No"
        ],
        "SignedTaxAuthority": [
            "No"
        ],
        "AgencyStatus": [
            "Unlinked"
        ],
        "PrepareActivityStatement": [
            "No"
        ],
        "PrepareTaxReturn": [
            "No"
        ],
        "ActiveAtoClient": [
            "No"
        ],
        "Contacts": [
            ""
        ]
    }
];

var mappedData = data.map(function(client) {
    let mappedClient = {
        name: client.Name[0],
        address: client.Address[0].replace('\n', ''),
        website: client.Website[0],
        firstName: client.FirstName ? client.FirstName[0] : undefined,
        lastName: client.LastName ? client.LastName[0] : undefined,
        phone: client.Phone[0],
        wfmID: client.ID[0]
    };
    return mappedClient;
})

function dispatch(req) {
    console.log(req);
}

dispatch(mappedData);
