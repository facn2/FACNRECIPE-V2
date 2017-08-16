var logout = document.getElementById('logout');
logout.addEventListener('click', function(e){
  request('/logout', function(err, res){
    if(err) console.log(err);
    window.location.replace('/');
  });
});

var addButton = document.getElementById('add-recipe');
addButton.addEventListener('click', function(e) {
  document.getElementById("overlay").style.display = "block";
});

var cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', function(e) {
  document.getElementById("overlay").style.display = "none";
})

var div = document.getElementById("recipe-container");
//div for showing the result

//I know I need to refactor this
var asian = document.createElement("div");
asian.setAttribute("id", "asian");
asian.setAttribute("class", "asian");
asian.innerText = 'Asian';

var arabic = document.createElement("div");
arabic.setAttribute("id", "arabic");
arabic.setAttribute("class", "arabic");
arabic.innerText = 'Arabic';


var italian = document.createElement("div");
italian.setAttribute("id", "italian");
italian.setAttribute("class", "italian");
italian.innerText = 'Italian';

var british = document.createElement("div");
british.setAttribute("id", "british");
british.setAttribute("class", "british");
british.innerText = 'British';



var buttonContainer = document.getElementById('button-container');
buttonContainer.setAttribute("class", "button-container")
buttonContainer.appendChild(asian);
buttonContainer.appendChild(arabic);
buttonContainer.appendChild(italian);
buttonContainer.appendChild(british);


document.getElementById('asian').addEventListener("click", function() {
  buttonContainer.classList.add("disappear");
  request(`/${this.innerText}`, updateDom);
})

document.getElementById('arabic').addEventListener("click", function() {
  buttonContainer.classList.add("disappear");
  request(`/${this.innerText}`, updateDom);

})
document.getElementById('italian').addEventListener("click", function() {
  buttonContainer.classList.add("disappear");
  request(`/${this.innerText}`, updateDom);

})
document.getElementById('british').addEventListener("click", function() {
  buttonContainer.classList.add("disappear");
  request(`/${this.innerText}`, updateDom);
})


/* generic XHR request */


function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    cb(null, xhr.responseText);
  });
  xhr.addEventListener("error", function() {
    cb("error" + xhr.responseType);
  });
  xhr.open("GET", url, true);
  xhr.send();
}


function updateDom(err, data) {
  if (err) {
    console.log(err);
  } else {
    var recipes = JSON.parse(data);

    var ul = document.createElement("ul");
    var goBack = document.createElement('button');
    goBack.setAttribute("class", "goback-button");
    goBack.innerText = "Go Back";
    var addButtonContainer = document.getElementById('add-button-container');
    addButtonContainer.appendChild(goBack);
    goBack.addEventListener('click', function() {
      ul.classList.add("disappear");
      buttonContainer.classList.remove("disappear");
      goBack.classList.add("disappear");
    })

    /* create a row in table for each user returned from DB */
    recipes.forEach(function(recipe) {
      var recipeBox = document.createElement("div");
      recipeBox.setAttribute("class", "recipe-box");
      var name = document.createElement("li");
      // name.innerHTML = `<strong>Title:</strong> ${recipe.recipe_name}<br><br>`;
      name.innerHTML = "<strong>Title:</strong> " + recipe.recipe_name + "<br><br>";
      recipeBox.appendChild(name);

      var ingredients = document.createElement("li");
      // ingredients.innerHTML = `<strong>Ingredients:</strong> ${recipe.recipe_ingredients}<br><br>`;
      ingredients.innerHTML = "<strong>Ingredients:</strong> " + recipe.recipe_ingredients + " <br><br>";
      recipeBox.appendChild(ingredients);
      var directions = document.createElement("li");
      // directions.innerHTML = `<strong>Directions:</strong> ${recipe.recipe_directions}<br><br>`;
      directions.innerHTML = "<strong>Directions:</strong> " + recipe.recipe_directions + " <br><br>";
      recipeBox.appendChild(directions);
      ul.appendChild(recipeBox);

      // ul.appendChild(document.createElement("hr"));
    });

    div.replaceChild(ul, div.firstChild);
  }
}
