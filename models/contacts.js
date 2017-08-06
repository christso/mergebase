var mongoose = require("mongoose");

// Post - title, content
var contactSchema = new mongoose.Schema({
    name: String,
    content: String,
    phone: String,
    email: String,
    picture: String
});
module.exports = mongoose.model("Contact", contactSchema);