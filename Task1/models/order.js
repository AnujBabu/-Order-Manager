const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: String,
    sub_total: String,
    phone_number: String
});

module.exports = mongoose.model('Orders', orderSchema);