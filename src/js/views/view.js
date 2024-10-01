import icons from 'url:../../img/icons.svg';

export default class View { //exporting class itself
	_data;

	render(data) {
		this._data = data;

		console.log('Incoming data:', data);
		const markup = this._generateMarkup();
		if (markup) {
    console.log(`Markup exists: ${markup}`); // Логируем разметку
		} else {
    console.warn('Markup is empty or undefined'); // Если markup пустой или неопределённый
		}

		console.log(`Parent element:`, this._parentEl);

		this._clear();
		console.log(`list: ${markup}`);
		console.log(`balh: ${this._parentEl}`)
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