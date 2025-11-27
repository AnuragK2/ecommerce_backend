const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({ name: reqData.topLevelCategory, level: 1 });
    await topLevel.save();
  }
  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      level: 2,
      parentCategory: topLevel._id,
    });
    await secondLevel.save();
  }
  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      level: 3,
      parentCategory: secondLevel._id,
    });
    await thirdLevel.save();
  }
  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.sizes,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });
  return await product.save();
}

async function deleteProduct(productId) {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    throw new Error("Product not found with the given id", productId);
  }
  return "Product deleted successfully";
}

async function updateProduct(productId, updateData) {
  const product = await Product.findByIdAndUpdate(productId, reqData);
  if (!product) {
    throw new Error("Product not found with the given id", productId);
  }
  return product;
}

async function findProductById(productId) {
  const product = await Product.findById(productId).populate("category").exec();
  if (!product) {
    throw new Error("Product not found with the given id" + productId);
  }
  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  // parse pagination params and set safe defaults
  pageSize = parseInt(pageSize, 10);
  pageNumber = parseInt(pageNumber, 10);
  if (isNaN(pageSize) || pageSize <= 0) pageSize = 10;
  if (isNaN(pageNumber) || pageNumber < 0) pageNumber = 0;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({
      name: category,
    });

    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }

  if (sizes) {
    // sizes may be a comma-separated string or an array
    const sizeArr = Array.isArray(sizes) ? sizes : String(sizes).split(",").map(s => s.trim()).filter(Boolean);
    const sizeSet = new Set(sizeArr);
    if (sizeSet.size > 0) query = query.where("sizes.name").in([...sizeSet]);
  }

    if(minPrice && maxPrice){
        query=query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discountPercent").gte(minDiscount);
    }
    
  if (stock) {
    // accept several naming variants from clients (inStock, in_stock, outOfStock, out_of_stock)
    const s = String(stock).toLowerCase();
    if (s === 'in_stock' || s === 'instock' || s === 'instock' || s === 'in-stock' || s === 'instock') {
      query = query.where("quantity").gt(0);
    } else if (s === 'out_of_stock' || s === 'outofstock' || s === 'outofstock' || s === 'out-stock') {
      query = query.where("quantity").lte(0);
    }
  }

    if(sort){
        const sortDirection=sort==="price_high" ?-1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

  // countDocuments expects a filter; passing the built query may include chaining
  const totalProducts = await Product.countDocuments(query.getFilter ? query.getFilter() : query);

  // compute skip ensuring it is not negative. Support 0-based pageNumber from clients.
  const skip = Math.max(0, (pageNumber - 1) * pageSize);
  query = query.skip(skip).limit(pageSize);
    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return {
        content: products,
        currentPage: pageNumber,
        totalPages: totalPages,
    }
}

async function createMultipleProducts(products) {
  for(let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
};