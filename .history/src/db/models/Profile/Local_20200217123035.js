const mongoose = require('mongoose');
const bcrypt = require('bc');
const Schema = mongoose.Schema;

const methods = require('./methods');
const statics = require('./statics');

const localSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    pending: Boolean,
    activationCode: String,

    passwordChangeCode: String,
    
    tokens: [String]
})

localSchema.methods.genToken = methods.local.genToken;
localSchema.methods.isValidPassword = methods.local.isValidPassword;
localSchema.methods.genActivationCode = methods.local.genActivationCode
localSchema.methods.genPasswordChangeCode = methods.local.genPasswordChangeCode

localSchema.methods.isValidToken = methods.common.isValidToken;

localSchema.statics.findByPayload = statics.local.findByPayload;

localSchema.pre('save', async function (next) {
    const profile = this;
    const existing = await LocalProfile.findOne({ email: profile.email });
    if (existing) {
        profile.password = existing.password === profile.password ? existing.password : await bcrypt.hash(profile.password, 8);
        return next();
    }
    profile.password = await bcrypt.hash(profile.password, 8);
    next();
})

const LocalProfile = mongoose.model('LocalProfile', localSchema, 'localprofiles');

module.exports = LocalProfile;