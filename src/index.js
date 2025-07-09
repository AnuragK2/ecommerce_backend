const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).send({message:"welcome to ecommerce api-node",status:true})
})

const authRouters = require("./routes/auth.route.js")
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route.js")
app.use("/api/users", userRouters);

const productRouters=require("./routes/product.route.js")
app.use("/api/products", productRouters);

const adminProductRouters=require("./routes/adminProduct.route.js")
app.use("/api/admin/products", adminProductRouters);

const cartRouter=require("./routes/cart.route.js")
app.use("/api/cart", cartRouter);

const cartItemRouter=require("./routes/cartItem.route.js")
app.use("/api/cart_items", cartItemRouter);

const orderRouter=require("./routes/order.route.js")
app.use("/api/orders", orderRouter);

const adminOrderRouter=require("./routes/adminOrder.route.js")
app.use("/api/admin/orders", adminOrderRouter);

const reviewRouter=require("./routes/review.route.js")
app.use("/api/reviews", reviewRouter);

const ratingRouter=require("./routes/rating.route.js")
app.use("/api/ratings", ratingRouter);

module.exports = app;
