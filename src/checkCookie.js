const {
  parse
} = require('cookie');
const {
  sign,
  verify
} = require('jsonwebtoken');
const SECRET = 'There is no secret';


const parseCookie = (cookie, ifFunc, elseFunc) => {
  let token;
  let login;
  const {
    jwt
  } = parse(cookie);

  // I know it is bad to sync method for jwt
  if(jwt){
     token = verify(jwt, SECRET);
     login = token.is_loggedin;
  }
  if (login) {
    ifFunc(token);
  } else {
    elseFunc();
  }
}

module.exports = parseCookie;
