import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
  }
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
  } catch (err) {
      console.error(`${err} load recipe`);
    throw err;
  }
};

export const loadSearchResults = async function(query){
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    data.data.recipes.map(el => {
      return {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        image: el.image_url,
      }
    })
  } catch (err) {
    console.error(`${err} load recipe`);
    throw err;
  }
};
loadSearchResults('pizza');