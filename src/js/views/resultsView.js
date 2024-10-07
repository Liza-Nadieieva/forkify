//basically it should be the same as recipeview 
//so that is why we create view js as parent class to reuse it elsewhere
import View from './view.js'; //importing parent class
import icons from 'url:../../img/icons.svg';


class resultsView extends View {

	_parentEl = document.querySelector('.results');
	_successMessage = '';
  	_errorMessage = 'No recipes found for your query! Please try again.';

	_generateMarkup() {
		return this._data.map(this._generateMarkupPreview).join('');
	}
	_generateMarkupPreview(el) {
		return `<li class="preview">
	            <a class="preview__link " href="#${el.id}">
	              <figure class="preview__fig">
	                <img src="${el.image}" alt="${el.title}" />
	              </figure>
	              <div class="preview__data">
	                <h4 class="preview__title">${el.title}</h4>
	                <p class="preview__publisher">${el.publisher}</p>
	              </div>
	            </a>
         	 </li>
	    	`
	}
};
export default new resultsView;