const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const ordersSchema = new Schema ({
    uid: {type: String},
    email: {type: String},
    productID: {type: Number},
    productName: {type: String},
    quantity: {type: Number}

}) 

const modelClass = mongoose.model('orders',ordersSchema);

module.exports = modelClass;
