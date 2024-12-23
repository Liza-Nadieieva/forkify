import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2
// if(module.hot) {
//   module.hot.accept()
// }

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return; 

    // update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    //loading recipe
    await model.loadRecipe(id); //async fucntion will return a promise

    //render recipe
    recipeView.renderSpinner();
    recipeView.render(model.state.recipe);

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back()e
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
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    //render the initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }
};

const controlPagination = function(goToPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //render new pagination buttons
  paginationView.render(model.state.search)
};

const controlServings = function(newServings) {
  //update the recipes servings (in state)
  model.updateServings(newServings);
  //update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  //add/remove bookmarks
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks)
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();
    
    //upload the new recipe data 
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe)
    //render recipeview
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();


    //close form window
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  }catch (err){
    console.error('err:', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();