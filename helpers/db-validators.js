const Role = require("../models/role");
const User = require("../models/user");

//Valid Role
const isRoleExist = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(` The role ${role} is not exist`);
  }
};

//Valid Email
const isEmailExist = async (email = "") => {
  const exisEmail = await User.findOne({ email });
  if (exisEmail) {
    throw new Error(`This ${email} email already exist`);
  }
};

//Valid ID
const isIdExist = async id => {
  const exisId = await User.findById(id);
  if (!exisId) {
    throw new Error(`This ID: ${id} is not exist`);
  }
};

module.exports = {
  isRoleExist,
  isEmailExist,
  isIdExist
}
