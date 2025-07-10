const cartService = require("../services/cart.service");

const findUserCart = async(req,res)=>{
    const user=await req.user;
    try {
        const cart = await cartService.findUserCart(user.id);
        return res.status(200).send(cart);
    }
    catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const addItemToCart = async (req, res) => {
    try {
      const user = req.user;
      await cartService.addCartItem(user._id.toString(), req.body);
     
      res.status(202).json({message:"Item Added To Cart Successfully", status:true});
    } catch (error) {
      // Handle error here and send appropriate response
      res.status(500).json({ message: "Failed to add item to cart.", error: error.message });
    }
  }


module.exports = {
    findUserCart,
    addItemToCart,
};