export class searchView {
	#parentEl = document.querySelector('.search'); //form selected

	getQuery() {
		const query = this.#parentEl.querySelector('.search__field').value;
		 //value of input search
		this.#clearInput();
		return query;
	}

	#clearInput() {
		this.#parentEl.querySelector('.search__field').value = '';
	}
	
	addHandlerSearch(handler) {
		this.#parentEl.addEventListener('submit', function (e) {
			e.preventDefault(); // prevent upload of page
			handler();
		});
	}
	
}

export default new searchView();