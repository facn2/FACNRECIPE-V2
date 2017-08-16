// Add code below to query your database
const dbConnection = require('../database/db_connection');

const getData = (country, cb) => {
   const myQuery = `SELECT recipe.recipe_name, recipe.recipe_ingredients, recipe.recipe_directions,
   users.username
   FROM
   recipe
   JOIN users
   ON recipe.user_id = users.id where recipe.recipe_origin=$1;`;

   dbConnection.query(myQuery, [country], (err, res) => {
      if (err)
         return cb(err);
      cb(null, res.rows);
   });
}

module.exports = getData;
