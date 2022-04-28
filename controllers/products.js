const { response } = require("express");
const { Product, Categorie } = require("../models");

//GET CONTROLLER
const getProducts = async (req, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("categorie", "name")
      .skip(Number(from))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    ...products
  });
};

//GET ONE CONTROLLER
const getProduct = async (req, res = response) => {
  const { id } = req.params;

  const productDB = await Product.findById(id)
    .populate("user", "name")
    .populate("categorie", "name");

  if (!productDB.state) {
    return res.status(401).json({
      msg: `This ${productDB.name} product is not active `
    });
  }

  res.json({
    productDB
  });
};

//POST CONTROLLER
const postProduct = async (req, res = response) => {
  const { name, categorie, price, description } = req.body;

  const productDB = await Product.findOne({ name });

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${name}, is exist`
    });
  }

  const categorieDB = await Categorie.findById(categorie);
  if (!categorieDB) {
    return res.status(400).json({
      msg: `The categorie ${name}, is not exist`
    });
  }

  const data = {
    name,
    user: req.user._id,
    categorie,
    price,
    description
  };

  const product = new Product(data);

  //Save DB
  await product.save();

  res.status(201).json(product);
};


//PUT CONTROLLER
const putProduct = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, categorie, ...data } = req.body;
  
    data.user = req.user._id;
  
    const product = await Product.findByIdAndUpdate(id, data, { new: true })
        .populate( 'user', 'name')
        .populate( 'categorie', 'name');
  
    res.json( product );
  };


//DELETE CONTROLLER
const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const data = {
      state: false,
      user: req.user._id
    };

    const product = await Product.findByIdAndUpdate(id, data, { new: true })
                    .populate( 'user', 'name')
                    .populate( 'categorie', 'name');
    res.json(product);
  };


module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
};
