const http = require('http');
const qs = require('querystring');
const getData = require('./getData');
const handlers = require('./handlers');
const dbConnection = require('../database/db_connection');
const bcrypt = require('./bcrypthash');
const parseCookie = require('./checkCookie');
const errFunc = require('./errFunc');
const {
  parse
} = require('cookie');
const {
  sign,
  verify
} = require('jsonwebtoken');
const SECRET = 'There is no secret';
let login;
let userId;

const router = (request, response) => {

  const endpoint = request.url.split('/')[1];


  //check incoming has valid jwt or not
  //goal 1: skip login page
  //goal 2: prevent accessing secret routes without login or token

  if (endpoint === '') {
    if (request.headers.cookie) {
      parseCookie(request.headers.cookie,
      ()=>{
          response.writeHead(302, {
            'location': '/recipe'
          });
          response.end();
      },
      ()=> errFunc.errClearCookies(response));
    } else if (request.method == "POST") {
      let str = '';
      request.on('data', (chunk) => {
        str += chunk;
      });
      request.on('end', () => {
        const {
          username,
          password
        } = qs.parse(str);
        const pwFromDb = `SELECT * FROM users where username=$1;`;
        dbConnection.query(pwFromDb, [username], (err, res) => {
          if (err) {
            console.log(err)
          } else {
            if (res.rows.length !== 0) {
              bcrypt.comparePasswords(password, res.rows[0].password, (err, result) => {
                if (err) console.log(err);
                if (result) {
                  //set jwt cookie, userid and post he made
                  const userDetails = {
                    is_loggedin: true,
                    user_id: res.rows[0].id,
                    username: res.rows[0].username
                  }
                  const jwtCookie = sign(userDetails, SECRET);
                  response.writeHead(302, {
                    'location': '/recipe',
                    'Set-cookie': `jwt=${jwtCookie}; max-age=6000; httpOnly;`
                  });
                  response.end();
                } else {
                  response.writeHead(401, 'content-type:text/html');
                  response.end("<a href='/'>wrong password. try again</a>");
                }
              });
            } else {
              response.writeHead(401, 'content-type:text/html');
              response.end("<a href='/'>no such user. try again</a>");
            }
          }
        });
      });
    } else if (request.method == "GET") {
      handlers.handlerForViews(request, response, '/public/login.html');
    }
  } else if (endpoint === 'recipe') {
    if (request.headers.cookie) {
      parseCookie(request.headers.cookie,
      ()=>handlers.handlerForViews(request, response, '/public/index.html'),
      ()=>errFunc.errNeedLogin(response)
    );
    } else errFunc.errNeedLogin(response);
  } else if (endpoint.match("^(Asian|Arabic|British|Italian)$")) {
    if (request.headers.cookie) {
      parseCookie(request.headers.cookie,
      ()=>{
        getData(endpoint, (err, res) => {
          if (err)
            return console.log('error querying the db');
          const data = JSON.stringify(res);
          response.writeHead(200, {
            'content-type': 'application/json'
          });
          response.end(data);
        });
      },
      ()=>errFunc.errNeedLogin(response)
    );
  } else errFunc.errNeedLogin(response);
  } else if (endpoint === 'add') {
    if (request.headers.cookie) {
      parseCookie(request.headers.cookie,
      (token)=>{
        let str = '';
        request.on('data', (chunk) => {
          str += chunk;
        });
        request.on('end', () => {
          const {
            name,
            ingredients,
            directions,
            origin
          } = qs.parse(str);
          //need to add user id
          const updateData = `INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin, user_id) VALUES ($1, $2, $3, $4, $5);`;
          dbConnection.query(updateData, [name, ingredients, directions, origin, token.user_id], (err, res) => {
            if (err) {
              console.log(err)
            } else {
              console.log('new data entered');
            }
          });
          response.writeHead(302, {
            'location': '/recipe'
          });
          response.end();
        });
      },
      ()=>errFunc.errNeedLogin(response)
    );
    } else errFunc.errNeedLogin(response);
  }
   else if (endpoint.indexOf('public') !== -1) {
    handlers.handlerForViews(request, response, request.url);
  }
  else if (endpoint==='getName') {
    if (request.headers.cookie) {
      parseCookie(request.headers.cookie, token=>response.end(token.username),
      ()=>errFunc.errNeedLogin(response));
    } else errFunc.errNeedLogin(response);
 } else if (endpoint === 'logout') {
    response.writeHead(302, {
      //redirect done in front end
      'Set-Cookie': 'jwt=0; max-age=0;'
    });
    response.end();
  } else {
    response.writeHead(404, "Content-Type:text/html");
    response.end("<h1>404 not found</h1>");
  }

};



module.exports = router;
