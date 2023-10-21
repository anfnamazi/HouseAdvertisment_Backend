const mongoose = require("mongoose");

const initilizeMongoServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connected to database!");
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}

module.exports = initilizeMongoServer();