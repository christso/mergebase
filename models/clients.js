var mongoose = require("mongoose");

// SCHEMA SETUP
var clientSchema = new mongoose.Schema({
    name: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    email: String,
    phone: String,
    businessStructure: String,
    address: String,
    city: String,
    website: String,
    comment: String,
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact"
        }
    ],
    wfmId: String,
    xplanId: String,
    clsupId: String,
    preWfmId: String,
    preXplanId: String,
    preWfmId: String
});

module.exports = mongoose.model("Client", clientSchema);