const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('[MONGO]: online');
    } catch (error) {
        console.log('[MONGO][ERROR]: Mongo db.js');
        console.log(error);
    }
}

module.exports = conectarDB;