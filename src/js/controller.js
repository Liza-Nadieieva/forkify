import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg';

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function(){
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

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
};
init();