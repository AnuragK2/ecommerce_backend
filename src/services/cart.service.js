const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product=require("../models/product.model")

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId });
        
        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
        cart.cartItems = cartItems;
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalQuantity = 0;
        cartItems.forEach((item) => {
            totalPrice += item.product.price * item.quantity;
            totalDiscountedPrice += item.product.price * item.quantity * (1 - item.product.discount / 100);
            totalQuantity += item.quantity;
        });
        cart.totalPrice = totalPrice;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.totalQuantity = totalQuantity;
        return cart;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, req) {
  console.log('addCartItem called with userId:', userId, 'and req:', req);
  const cart = await Cart.findOne({ user: userId });
  console.log('Cart found:', cart);
  if (!cart) {
    throw new Error('Cart not found for user: ' + userId);
  }
  const product = await Product.findById(req.productId);
  console.log('Product found:', product);
  if (!product) {
    throw new Error('Product not found for productId: ' + req.productId);
  }
  const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });
  console.log('CartItem isPresent:', isPresent);
  if (!isPresent) {
    const cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      quantity: 1,
      userId,
      price: product.discountedPrice,
      size: req.size,
      discountedPrice: product.discountedPrice
    });
    const createdCartItem = await cartItem.save();
    cart.cartItems.push(createdCartItem);
    await cart.save();
    console.log('New CartItem created and added:', createdCartItem);
  }
  return 'Item added to cart';
}


    
module.exports={createCart, findUserCart, addCartItem}