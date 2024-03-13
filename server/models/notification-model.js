const {Schema, model} = require('mongoose');
const {ObjectId} = require("mongodb");

const NotificationSchema = new Schema({
    type: {type: String, default: 'email'},
    address: {type: String},
    tgName: {type: String},
    tgCode: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Notification', NotificationSchema);
