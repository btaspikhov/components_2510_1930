(function () {
  'use strict';

  class Menu {
    constructor ({el}) {
      this.el = el;
      this._onClick = this._onClick.bind(this);

      this._initEvents();
    }

    _initEvents () {
      this.el.addEventListener('click', this._onClick);
    }

    _isItem (el) {
      return el.classList.contains('menu__item');
    }

    _onClick (event) {
      if (this._isItem(event.target)) {
        this._onItemClick(event);
      }
    }

    _onItemClick (event) {
      console.log(event.target.innerHTML);
    }
  }

  //export
  window.Menu = Menu;

})();
