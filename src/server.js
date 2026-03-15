const app = require(".");
const { connectDb } = require("./config/db");
const PORT = process.env.PORT || 5454;

app.listen(PORT, async() => {
    await connectDb();
    console.log("ecommerce api listening on PORT: ",PORT);
})