
const generateJWT = require("../helpers/generate-jwt");
const googleVerify = require("../helpers/google-verify");

module.exports = {
    ...generateJWT,
    ...googleVerify
}