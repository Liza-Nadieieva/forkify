import View from './view.js'; //importing parent class
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {

	_parentEl = document.querySelector('.bookmarks__list');
	_successMessage = '';
  	_errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';

  	addHandlerRender(handler) {
  		window.addEventListener('load', handler);
  	}

  	_generateMarkup() {
		return this._data
			.map(bookmark => previewView
			.render(bookmark, false))
			.join('');
	}
	
};
export default new bookmarksView();