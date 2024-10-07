import View from './view.js'; //importing parent class
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
	_parentEl = document.querySelector('.pagination');

	addHandlerClick(handler) {
		this._parentEl.addEventListener('click' ,function(e){
			const btn = e.target.closest('.btn--inline');
			if(!btn) return;
			const goToPage = +btn.dataset.goto;
			handler(goToPage);
		})
	}

	_generateMarkup() {
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
		const currentPage = this._data.page;
		//Page 1, and there are other pages
		if(currentPage === 1 && numPages > 1) {
			return this.generateMarkUpButtonNext(currentPage);
		}
		//Last Page
		if(currentPage === numPages && numPages > 1) {
			return this.generateMarkUpButtonPrev(currentPage)
		}
		//Other page
		if(currentPage < numPages) {
			 return`
	            ${this.generateMarkUpButtonPrev(currentPage)}
	            ${this.generateMarkUpButtonNext(currentPage)}
        	`;
		}
		//Page 1, and there are not other pages
		return '';

	}
	generateMarkUpButtonNext(currentPage) {
		return `
			<button  data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
	            <span>Page ${currentPage + 1}</span>
	            <svg class="search__icon">
	              <use href="${icons}#icon-arrow-right"></use>
	            </svg>
          	</button>
        `
	}
	generateMarkUpButtonPrev(currentPage) {
		return `
			<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
	            <svg class="search__icon">
	              <use href="${icons}#icon-arrow-left"></use>
	            </svg>
	            <span>Page ${currentPage - 1}</span>
          	</button>
        `;
	}
}
export default new paginationView();