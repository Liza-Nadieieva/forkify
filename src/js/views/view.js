import icons from 'url:../../img/icons.svg';

export default class View { //exporting class itself
	_data;

	render(data) {
		if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
		this._data = data;
		const markup = this._generateMarkup();
		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	_clear() {
		this._parentEl.innerHTML = '';
	}

	renderSpinner = function () {
		const markup = `
		    <div class="spinner">
		        <svg>
		          <use href="${icons}#icon-loader"></use>
		        </svg>
		    </div>`
		  this._parentEl.innerHTML = '';
		  this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}
	renderMessage(message = this._successMessage) {
	    const markup = `
	      <div class="message">
	              <div>
	                <svg>
	                  <use href="${icons}#icon-smile></use>
	                </svg>
	              </div>
	              <p>${message}</p>
	        </div>
	    `
	    this._clear();
	    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  	}	

  renderError(message = this._errorMessage) { // if nothing pass default message
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}