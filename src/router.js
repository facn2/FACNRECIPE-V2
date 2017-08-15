const http = require('http');
const qs = require('querystring');
const pg = require('pg');
const getData = require('./getData');
const handlers = require('./handlers');
const dbConnection = require('../database/db_connection');

const router = (request, response) => {

   const endpoint = request.url.split('/')[1];

   if (endpoint === '') {
      handlers.handlerForViews(request, response, '/views/index.html');
   } else if (endpoint.match("^Asian|Arabic|British|Italian$")) {
      getData(endpoint, (err, res) => {
         if (err)
            return console.log('error querying the db');
         const data = JSON.stringify(res);
         response.writeHead(200, {
            'content-type': 'application/json'
         });
         response.end(data);
      });
   } else if (endpoint === 'add') {
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

         const updateData = `INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin) VALUES ($1, $2, $3, $4);`;
         dbConnection.query(updateData, [name, ingredients, directions, origin], (err, res) => {
            if (err) {
               console.log(err)
            } else {
               console.log('new data entered');
            }
         });
         response.writeHead(302, {
            'location': '/'
         });
         response.end();
      });

   } else if (endpoint.indexOf('views') !== -1) {
      handlers.handlerForViews(request, response, request.url);
   } else {
      response.writeHead(404, "Content-Type:text/html");
      response.end("<h1>404 not found</h1>");
   }

};



module.exports = router;
