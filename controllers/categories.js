const { response } = require("express");
const { Categorie } = require("../models");

//GET CONTROLLER
const getCategories = async (req, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Categorie.countDocuments(query),
    Categorie.find(query)
      .populate("user", 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    ...categories
  });
};

//GET ONE CONTROLLER
const getCategorie = async (req, res = response) => {
  const { id } = req.params;

  const categorieDB = await Categorie.findById(id).populate('user', 'name');

  if (!categorieDB.state) {
    return res.status(401).json({
      msg: `This ${categorieDB.name} categorie is not active `
    });
  }

  res.json({
    categorieDB
  });
};

//POST CONTROLLER
const postCategorie = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categorieDB = await Categorie.findOne({ name });

  if (categorieDB) {
    return res.status(400).json({
      msg: `The categorie ${name}, is exist`
    });
  }

  const data = {
    name,
    user: req.user._id
  };

  const categorie = new Categorie(data);

  //Save DB
  await categorie.save();

  res.status(201).json(categorie);
};

//PUT CONTROLLER
const putCategorie = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true }).populate( 'user', 'name');

  res.json( categorie );
};

//DELETE CONTROLLER
const deleteCategorie = async (req = request, res = response) => {
  
  const { id } = req.params;

  const data = {
    state: false,
    user: req.user._id
  };

  const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true }).populate( 'user', 'name');
  res.json(categorie);
};

module.exports = {
  getCategories,
  getCategorie,
  postCategorie,
  putCategorie,
  deleteCategorie
};
