//basically it should be the same as recipeview 
//so that is why we create view js as parent class to reuse it elsewhere
import View from './view.js'; //importing parent class


class resultsView extends View {

	_parentEl = document.querySelector('.results');

	_generateMarkup() {
		console.log(`this._data ${this._data}`)
		return this._data.map(this._generateMarkupPreview).join('');
	}
	_generateMarkupPreview(el) {
		return `<li class="preview">
	        <a class="preview__link" href="#${el.id}">
	          <figure class="preview__fig">
	            <img src="src/img/test-1.jpg" alt="Test" />
	          </figure>
	          <div class="preview__data">
	            <h4 class="preview__name">
	            ${el.id}
	            </h4>
	            <p class="preview__author">The Pioneer Woman</p>
	          </div>
	        </a>
	    </li>
	   `
	}
};
export default new resultsView;