const {Schema, model} = require('mongoose');
const {ObjectId} = require("mongodb");

const NotificationSchema = new Schema({
    type: {type: String, default: 'email'},
    value: {type: String},
    userid: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Notification', NotificationSchema);
