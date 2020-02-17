const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, async (error, success) => {
    if (error) {
        return console.log('error when connecting to mongodb');
    }
    console.log('success connected to mogodb');
});