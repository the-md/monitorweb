const {Schema, model} = require('mongoose');
const {ObjectId} = require("mongodb");

const SiteSchema = new Schema({
    url: {type: String, required: true},
    name: {type: String},
    interval: {type: Number, required: true},
    userid: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Site', SiteSchema);
