var Client = require('./models/clients');

var clients = [
    {
        _id: '1',
        name: 'Gates, Bill',
        firstName: 'Bill',
        lastName: 'Gates',
        email: 'bill@microsoft.com',
        phone: '0444123123',
        businessStructure: 'Individual',
        address: '1 Epping Rd',
        city: 'North Ryde',
        wfmId: '131232',
        xplanId: '1877',
        clsupId: '700'
    },
    {
        _id: '2',
        name: 'EntityProcess',
        email: 'chris@entityprocess.com',
        phone: '0430473409',
        businessStructure: 'Company',
        address: '1701 Metro Grand Tower',
        city: 'Chatswood',
        website: 'http://entityprocess.com',
        wfmId: '131234',
        xplanId: '1878',
        clsupId: '701'
    },
    {
        _id: '3',
        name: 'Super Constructors',
        email: 'bob@superconstructors.com',
        phone: '0411555004',
        businessStructure: 'Company',
        address: '333 George Street',
        city: 'Sydney',
        website: 'http://superconstructors.com',
        wfmId: '131235',
        xplanId: '1878',
        clsupId: '702'
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