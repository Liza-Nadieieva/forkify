import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE
  },
  bookmarks: []
};


export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe }= data.data; //distructuring recipe = data.data.recipe or {recipe} = data.data
      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
    };
    if(state.bookmarks.some(bookmark => bookmark.id === id)){
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
      console.error(`${err} load recipe`);
    throw err;
  }
};

export const loadSearchResults = async function(query){

  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(el => {
      return {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        image: el.image_url,
      }
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} load recipe`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  return state.search.results.slice(start, end);
};

export const updateServings = function(newServings) {
  //newQuantity = old * newServings / oldServings
  state.recipe.ingredients.forEach(el => el.quantity = el.quantity * newServings / state.recipe.servings);
  //update servings 
  state.recipe.servings = newServings;
};
const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function(recipe) {
  //add bookmark
  state.bookmarks.push(recipe);
  //mark current recipe as bookmarked
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function(id) {
  //delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  //mark current recipe as not bookmarked

  if(id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if(storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function() {
  localStorage.clear('bookmarks');
};



