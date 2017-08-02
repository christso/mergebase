var mongoose = require("mongoose");

// SCHEMA SETUP
var clientSchema = new mongoose.Schema({
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    businessStructure: String,
    address: String,
    city: String,
    website: String,
    comment: String,
    wfmId: String,
    xplanId: String,
    clsupId: String
});

module.exports = mongoose.model("Client", clientSchema);