const {Schema, model} = require('mongoose');
const {ObjectId} = require("mongodb");

const SiteSchema = new Schema({
    url: {type: String, required: true},
    name: {type: String},
    interval: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    lastChecked: {type: Date, default: Date.now}
})

module.exports = model('Site', SiteSchema);
