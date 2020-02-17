const findByPayload = async function (payload) {
    const Profile = this;
    return await Profile.findOne({ _id: payload.id });
}

module.exports = {
    findByPayload,
}