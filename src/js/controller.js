import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2
if(module.hot) {
  module.hot.accept()
}

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return; 
    //loading recipe
    await model.loadRecipe(id); //async fucntion will return a promise

    //render recipe
    recipeView.renderSpinner();
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(); 
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    //1) get search query 


    const query = searchView.getQuery();
    if(!query) return;
    //2) load search results
    await model.loadSearchResults(query);// doesnot return anything only manilupate the state
    //3) render results
    //show the spinner at first 
    //need the same method as recipeView render to render results 

    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err)
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();