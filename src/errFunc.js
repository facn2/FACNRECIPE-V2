const errNeedLogin = (response) => {
  response.writeHead(401, 'content-type:text/html');
  response.end("<a href='/'>you need to login. try again</a>");
}

const errNoSuchUser = (response) => {
  response.writeHead(401, 'content-type:text/html');
  response.end("<a href='/'>no such user. try again</a>");
}

const errWrongPw = (response) => {
  response.writeHead(401, 'content-type:text/html');
  response.end("<a href='/'>wrong password. try again</a>");
}

const errClearCookies = (response) => {
  response.writeHead(500, 'content-type:text/html');
  response.end("<a href='/'>please remove the cookies from browsers before visting our website</a>");
}


module.exports = {
                  errNeedLogin,
                  errNoSuchUser,
                  errWrongPw,
                  errClearCookies
                }
