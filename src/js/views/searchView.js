export class searchView {
	_parentEl = document.querySelector('.search'); //form selected

	getQuery() {
		const query = this._parentEl.querySelector('.search__field').value;
		 //value of input search
		this._clearInput();
		return query;
	}

	_clearInput() {
		this._parentEl.querySelector('.search__field').value = '';
	}
	
	addHandlerSearch(handler) {
		this._parentEl.addEventListener('submit', function (e) {
			e.preventDefault(); // prevent upload of page
			handler();
		});
	}
	
}

export default new searchView();