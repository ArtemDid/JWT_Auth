const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id) {
    const token = jwt.sign(
      { id: id },
      process.env.SECRET, 
      { expiresIn: '7d' }
    );
    return token;
  }
}

module.exports = Helper;