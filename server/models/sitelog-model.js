const {Schema, model} = require('mongoose');
const {ObjectId} = require("mongodb");

const SiteLogSchema = new Schema({
    siteId: {type: Schema.Types.ObjectId, ref: 'Site', required: true},
    time: {type: Date, default: Date.now},
    response: {type: Number, required: true}
})

module.exports = model('SiteLog', SiteLogSchema);
