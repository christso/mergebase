var Client = require('./clientModel');

var data = [
    {
        name: 'Gates, Bill',
        firstName: 'Bill',
        lastName: 'Gates',
        email: 'bill@microsoft.com',
        phone: '0444123123',
        businessStructure: 'Individual',
        address: '1 Epping Rd, North Ryde, New South Wales',
        wfmId: '13474989',
        xplanId: '597ea4538bdccc1394fa8662',
        clsupId: '700'
    },
    {
        name: 'EntityProcess',
        email: 'chris@entityprocess.com',
        phone: '0430473409',
        businessStructure: 'Company',
        address: '1701 Chatswood Avenue, Chatswood, New South Wales',
        website: 'http://entityprocess.com',
        wfmId: '13282742',
        xplanId: '597ea4538bdccc1394fa8663',
        clsupId: '701'
    },
    {
        name: 'Super Constructors',
        email: 'bob@superconstructors.com',
        phone: '0411555004',
        businessStructure: 'Company',
        address: '333 George Street, Sydney NSW',
        website: 'http://superconstructors.com',
        wfmId: '13474985',
        xplanId: '597ea4538bdccc1394fa8664',
        clsupId: '702'
    },
    {
        name: 'Gibbs, Jodie',
        firstName: 'Jodie',
        lastName: 'Gibbs',
        email: 'jodi.gibbs@cipromox.org',
        phone: '+1 (829) 448-2825',
        businessStructure: 'Individual',
        address: '123 Midson Rd, Epping NSW 2121',
        website: 'http://cipromox.org',
    },
    {
        name: 'CIPROMOX',
        email: 'jodi.gibbs@cipromox.org',
        phone: '+1 (829) 448-2825',
        businessStructure: 'Company',
        address: '123 Midson Rd, Epping NSW 2121',
        website: 'http://cipromox.org',
    },
    {
        website: "http://eternis.com",
        address: "12/100 George St, Parramatta NSW 2150",
        businessStructure: "Company",
        phone: "+1 (829) 459-3462",
        email: "zelma.white@medalert.ca",
        name: "MEDALERT"
    },
    {
        website: "http://nutralab.com",
        address: "140 Arthur St, North Sydney NSW 2060",
        businessStructure: "Company",
        phone: "+1 (900) 412-2438",
        email: "hamilton.wilkins@enervate.com",
        name: "ENERVATE"
    },
    {
        website: "http://assistia.com",
        address: "755 Hunter St, Newcastle NSW 2300",
        businessStructure: "Company",
        phone: "+1 (847) 423-3556",
        email: "cathy.barnes@zoxy.net",
        name: "ZOXY"
    },
    {
        website: "http://radiantix.com",
        address: "48 Oakdale Rd, Gateshead NSW 2290",
        businessStructure: "Company",
        phone: "+1 (981) 573-2154",
        email: "rosa.potts@centree.me",
        name: "CENTREE"
    },
    {
        website: "http://digiprint.com",
        address: "235 Darby St, Cooks Hill NSW 2300",
        businessStructure: "Company",
        phone: "+1 (976) 587-3610",
        email: "essie.bowen@cemention.co.uk",
        name: "CEMENTION"
    },
    {
        website: "http://xiix.com",
        address: "5/33-37 Murray Rd S, Welshpool WA 6106",
        businessStructure: "Company",
        phone: "+1 (825) 437-3608",
        email: "harriet.shepherd@oatfarm.ca",
        name: "OATFARM"
    },
    {
        website: "http://zepitope.com",
        address: "6/280 Bannister Rd, Perth WA 6155",
        businessStructure: "Company",
        phone: "+1 (981) 451-3482",
        email: "beth.rowland@qualitex.us",
        name: "QUALITEX"
    },
    {
        website: "http://zytrex.com",
        address: "1881, Great Eastern Hwy, The Lakes WA 6556",
        businessStructure: "Company",
        phone: "+1 (879) 413-2596",
        email: "schultz.barr@eyeris.com",
        name: "EYERIS"
    },
    {
        website: "http://overplex.com",
        address: "961 Coyle Street, Hegins, District Of Columbia, 4244",
        businessStructure: "Individual",
        phone: "+1 (975) 464-3457",
        email: "leblanc.noble@exoswitch.tv",
        lastName: "Noble",
        firstName: "Leblanc",
        name: "EXOSWITCH"
    },
    {
        website: "http://ozean.com",
        address: "502 Christopher Avenue, Bethany, Oklahoma, 9796",
        businessStructure: "Individual",
        phone: "+1 (861) 493-3987",
        email: "christensen.hernandez@recrisys.biz",
        lastName: "Hernandez",
        firstName: "Christensen",
        name: "RECRISYS"
    },
    {
        website: "http://nutralab.com",
        address: "610 Lewis Place, Fulford, Wisconsin, 3371",
        businessStructure: "Individual",
        phone: "+1 (942) 482-2039",
        email: "wilkins.campos@zenthall.ca",
        lastName: "Campos",
        firstName: "Wilkins",
        name: "ZENTHALL"
    },
    {
        website: "http://acusage.com",
        address: "281 Eaton Court, Corinne, Minnesota, 3320",
        businessStructure: "Individual",
        phone: "+1 (832) 554-3003",
        email: "meadows.roberson@bizmatic.co.uk",
        lastName: "Roberson",
        firstName: "Meadows",
        name: "BIZMATIC"
    },
    {
        website: "http://comveyor.com",
        address: "788 Amboy Street, Brownlee, Colorado, 9638",
        businessStructure: "Individual",
        phone: "+1 (902) 600-2794",
        email: "woods.henson@kindaloo.info",
        lastName: "Henson",
        firstName: "Woods",
        name: "KINDALOO"
    },
    {
        website: "http://vixo.com",
        address: "191 Moffat Street, Bainbridge, Louisiana, 3974",
        businessStructure: "Individual",
        phone: "+1 (879) 438-2487",
        email: "alyssa.miller@hometown.name",
        lastName: "Miller",
        firstName: "Alyssa",
        name: "HOMETOWN"
    },
    {
        website: "http://unia.com",
        address: "186 Hegeman Avenue, Craig, Oregon, 7027",
        businessStructure: "Individual",
        phone: "+1 (897) 456-2303",
        email: "charlotte.watson@dragbot.org",
        lastName: "Watson",
        firstName: "Charlotte",
        name: "DRAGBOT"
    },
    {
        website: "http://enaut.com",
        address: "526 Maujer Street, Carlos, Alabama, 9898",
        businessStructure: "Individual",
        phone: "+1 (818) 509-3862",
        email: "malone.meyers@injoy.me",
        lastName: "Meyers",
        firstName: "Malone",
        name: "INJOY"
    },
    {
        website: "http://cytrak.com",
        address: "219 Hart Place, Elfrida, Alaska, 256",
        businessStructure: "Individual",
        phone: "+1 (848) 516-3435",
        email: "judy.snider@ersum.com",
        lastName: "Snider",
        firstName: "Judy",
        name: "ERSUM"
    },
    {
        website: "http://quilm.com",
        address: "868 Grant Avenue, Fruitdale, Washington, 7499",
        businessStructure: "Individual",
        phone: "+1 (843) 466-3274",
        email: "lynnette.langley@filodyne.us",
        lastName: "Langley",
        firstName: "Lynnette",
        name: "FILODYNE"
    },
    {
        website: "http://zerology.com",
        address: "197 Prospect Street, Vale, Rhode Island, 2712",
        businessStructure: "Individual",
        phone: "+1 (889) 533-2197",
        email: "palmer.waller@dyno.net",
        lastName: "Waller",
        firstName: "Palmer",
        name: "DYNO"
    }
];


function seedDB() {
    Client.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed clients!");

        // add a few clients
        Client.create(data, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("added a client!");
            }
        });
    });
}

module.exports = seedDB;