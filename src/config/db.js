const mongoose= require("mongoose")

const mongodbUrl = "mongodb+srv://anuragk0424:Anurag123@cluster0.yam4hnx.mongodb.net/?retryWrites=true&w=majority"

const connectDb = () => {
    return mongoose.connect(mongodbUrl);
}
module.exports={connectDb}