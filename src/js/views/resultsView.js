import View from './view.js'; //importing parent class
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
//basically it should be the same as recipeview 
//so that is why we create view js as parent class to reuse it elsewhere

class resultsView extends View {
	_parentEl = document.querySelector('.results');
	_successMessage = '';
  	_errorMessage = 'No recipes found for your query! Please try again.';

	_generateMarkup() {
		return this._data
			.map(result => previewView
			.render(result, false))
			.join('');
	}
};
export default new resultsView();