const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const methods = require('./methods');
const statics = require('./statics');

const googleSchema = new Schema({
    id: String,
    email: {
        type: String,
        unique: true
    },
    name: String,
    tokens: [String],
})

googleSchema.methods.genToken = methods.google.genToken;
googleSchema.methods.updateInfo = methods.google.updateInfo;

googleSchema.methods.isValidToken = methods.common.isValidToken;

googleSchema.statics.findByPayload = statics.google.findByPayload;

const GoogleProfile = mongoose.model('GoogleProfile', googleSchema, 'googleprofiles');

module.exports = GoogleProfile;