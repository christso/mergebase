var axios = require('axios');

var client = {
	name: 'Christopher Tso 3',
	email: 'chris@entityprocess.com',
	phone: '0430473409'
};

// // CREATE
// axios.post("http://localhost:3001/clients", client, function(err, clients) {
//     if (err) {
//         console.log("CLIENT ERROR", err);
//     } else {
//         console.log("CLIENT SUCCESS", clients);
//     }
// });

// UPDATE
axios.put("http://localhost:3001/clients/5981556172ffa74e9cff71bd", client, function(err, clients) {
    if (err) {
        console.log("CLIENT ERROR", err);
    } else {
        console.log("CLIENT SUCCESS", clients);
    }
});