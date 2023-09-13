const jwt = require("jsonwebtoken");

const create_Token = (id) =>{
    return jwt.sign({_id:id}, process.env.SECRET , {expiresIn: "7d"});
}
module.exports = {create_Token};