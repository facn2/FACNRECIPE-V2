const fs = require('fs');
const path = require('path');

const handlerForViews = (request, response, fileName) => {
   const fileType = fileName.split(".")[1];
   const filePath = path.join(__dirname, "..", fileName);
   fs.readFile(filePath, function(error, file) {
      if (error) {
         response.writeHead(500, 'Content-Type:text/html');
         response.end('<h1>Sorry, there was a problem loading this page</h1>');
      } else {
         response.writeHead(200, {
            "Content-Type": "text/" + fileType
         });
         response.end(file);
      }
   });
}







module.exports = {
   handlerForViews
};
