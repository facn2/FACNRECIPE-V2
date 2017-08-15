'use strict';

const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  // use bcrypt to hash the password and return it asynchronously
bcrypt.genSalt(10, (err, salt)=>{
  bcrypt.hash(password, salt, (err, hash)=>{
    callback(null, hash);
  });
});
}


const comparePasswords = (password, hashedPassword, callback) => {
  // use bcrypt to compare the passwords and return a boolean asynchronously
  bcrypt.compare(password, hashedPassword, function(err, res) {
    // res === false
    callback(null, res);
});
};

// comparePasswords('password', '$2a$06$.w4LmZVF0thzlVMQKpKE/.Qfiz9lcPQwiXowfMO7jbW/1dh/kgFVa', (err, res)=>console.log(res));

module.exports = {
  comparePasswords,
  hashPassword
};
