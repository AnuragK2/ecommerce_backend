const mongoose= require("mongoose")
require("dotenv").config();

const mongodbUrl = process.env.MONGODB_URL;

const connectDb = () => {
    return mongoose.connect(mongodbUrl);
}
module.exports={connectDb}