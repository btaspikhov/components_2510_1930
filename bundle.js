/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _menu = __webpack_require__(1);
	
	var _model = __webpack_require__(2);
	
	var _form = __webpack_require__(3);
	
	var _http = __webpack_require__(4);
	
	var menuModel = new _model.Model({
		resource: 'https://components2510.firebaseio.com/menu/-KZbcV-H6EQRXPvfKhx_.json',
		data: {}
	});
	
	var menu = new _menu.Menu({
		el: document.querySelector('.js-menu'),
		onPick: function onPick(item) {
			console.log(item);
		},
		onRemove: function onRemove() {}
	});
	
	menuModel.on('update', function (data) {
		menu.setData(data);
		menu.render();
	});
	
	var form = new _form.Form({
		el: document.querySelector('.js-form')
	});
	
	form.on('add', function (event) {
		menu.addItem(event.detail); // обновляю интерфейс
	
		menuModel.setData(menu.getData()); // обновляю данные в моделе
		menuModel.save(); // сохраняю изменения на сервере
	});
	
	menuModel.fetch();
	
	_http.httpService.get('/package.json').then(function (responseText) {
		console.log('App version: ' + JSON.parse(responseText).version);
	}, function (xhr) {
		console.error('App version fetching failed!');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//import
	var _template = window.fest['menu/menu.tmpl'];
	
	/**
	 * @class Menu
	 * Компонента "Меню"
	 */
	
	var Menu = function () {
	
		/**
	  * @constructor
	  * @param  {Object} opts
	  */
		function Menu(_ref) {
			var el = _ref.el,
			    _ref$data = _ref.data,
			    data = _ref$data === undefined ? { items: [], title: 'simple menu' } : _ref$data,
			    onPick = _ref.onPick;
	
			_classCallCheck(this, Menu);
	
			// деструктуризация объекта
			this.el = el;
			this.data = data;
			this.onPick = onPick;
	
			this._initEvents();
		}
	
		_createClass(Menu, [{
			key: 'setData',
			value: function setData(data) {
				this.data = data;
			}
		}, {
			key: 'getData',
			value: function getData() {
				return this.data;
			}
	
			/**
	   * Добавляем элемент меню
	   * @param {Object} item
	   */
	
		}, {
			key: 'addItem',
			value: function addItem(item) {
				this.data.items.push(item);
				this.render();
			}
	
			/**
	   * Удаляем пункт меню из данных
	   * @param  {Object} removedItem
	   */
	
		}, {
			key: 'removeItem',
			value: function removeItem(removedItem) {
				this.data.items = this.data.items.filter(function (item, index) {
					return index !== removedItem.index;
				});
				this.render();
			}
	
			/**
	   * Создаем HTML
	   */
	
		}, {
			key: 'render',
			value: function render() {
				this.el.innerHTML = _template(this.data);
			}
	
			/**
	  * Удаления элемента меню
	  * @param  {HTMLElement} item
	  * @private
	  */
	
		}, {
			key: '_onremove',
			value: function _onremove(item) {
				var index = parseInt(item.parentNode.dataset.index, 10);
	
				this.removeItem({
					index: index
				});
			}
	
			/**
	  * Выбор элемента меню
	  * @param  {HTMLElement} item
	  */
	
		}, {
			key: '_onpick',
			value: function _onpick(item) {
				this.onPick(item);
			}
	
			/**
	  * Развешиваем события
	  */
	
		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('click', this._onClick.bind(this));
			}
	
			/**
	  * Клик в любую область меню
	  * @param {Event} event
	  * @private
	  */
	
		}, {
			key: '_onClick',
			value: function _onClick(event) {
				event.preventDefault();
				var item = event.target;
	
				try {
					this['_on' + item.dataset.action](item);
				} catch (e) {
					throw new Error('\u041C\u0435\u0442\u043E\u0434 ' + item.dataset.action + ' \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D!');
				}
			}
		}]);
	
		return Menu;
	}();
	
	// Export
	
	
	exports.Menu = Menu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Model = function () {
		function Model(_ref) {
			var resource = _ref.resource,
			    _ref$data = _ref.data,
			    data = _ref$data === undefined ? {} : _ref$data;
	
			_classCallCheck(this, Model);
	
			this.resource = resource;
			this._handlers = {};
	
			this.setData(data);
		}
	
		_createClass(Model, [{
			key: 'setData',
			value: function setData(data) {
				this._data = data;
				this.trigger('update', this._data);
			}
		}, {
			key: 'getData',
			value: function getData() {
				return this._data;
			}
		}, {
			key: 'save',
			value: function save() {
				this._makeRequset('PUT', this.resource);
			}
		}, {
			key: 'fetch',
			value: function fetch() {
				this._makeRequset('GET', this.resource);
			}
		}, {
			key: 'on',
			value: function on(name, callback) {
				if (!this._handlers[name]) {
					this._handlers[name] = [];
				}
	
				this._handlers[name].push(callback);
			}
		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				if (this._handlers[name]) {
					this._handlers[name].forEach(function (callback) {
						return callback(data);
					});
				}
			}
		}, {
			key: '_makeRequset',
			value: function _makeRequset(method, resource) {
				var _this = this;
	
				var xhr = new XMLHttpRequest();
				xhr.open(method, resource, true);
				// xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) {
						return;
					}
	
					if (xhr.status === 200) {
						var data = JSON.parse(xhr.responseText);
	
						if (method === 'GET') {
							_this.trigger('fetch', xhr);
							_this.setData(data);
						}
					}
				};
	
				if (method === 'PUT') {
					xhr.send(JSON.stringify(this._data));
				} else {
					xhr.send();
				}
			}
		}]);
	
		return Model;
	}();
	
	//export
	
	
	exports.Model = Model;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Form
	 * Компонента "Форма"
	 */
	var Form = function () {
	
		/**
	  * @constructor
	  * @param  {Object} opts
	  */
		function Form(_ref) {
			var el = _ref.el,
			    data = _ref.data;
	
			_classCallCheck(this, Form);
	
			this.el = el;
			this.data = data;
	
			this.render();
			this._initEvents();
		}
	
		/**
	  * Создаем HTML
	  */
	
	
		_createClass(Form, [{
			key: 'render',
			value: function render() {
				this.el.innerHTML = '\n\t\t\t<form class="form pure-form">\n\t\t\t\t<fieldset>\n\t\t\t\t\t<input class="form__input"\n\t\t\t\t\t\ttype="url" name="href"\n\t\t\t\t\t\trequired="required"\n\t\t\t\t\t\tplaceholder="url"/>\n\t\t\t\t\t\n\t\t\t\t\t<input class="form__input"\n\t\t\t\t\t\ttype="text" name="anchor"\n\t\t\t\t\t\trequired="required"\n\t\t\t\t\t\tplaceholder="anchor"/>\n\t\t\t\t\t<button class="form__btn pure-button" type="submit">\n\t\t\t\t\t\tSave\n\t\t\t\t\t</button>\n\t\t\t\t\t\n\t\t\t\t</fieldset>\n\t\t\t</form>';
			}
	
			/**
	   * Получение элемента формы по имени
	   * @param  {string} name
	   * @return {HTMLElement}
	   */
	
		}, {
			key: 'getField',
			value: function getField(name) {
				return this.el.querySelector('[name="' + name + '"]');
			}
	
			/**
	  * Развешиваем события
	  */
	
		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('submit', this._onSubmit.bind(this));
			}
	
			/**
	   * Подписываемся
	   * @param  {string}   name    
	   * @param  {Function} callback
	   */
	
		}, {
			key: 'on',
			value: function on(name, callback) {
				this.el.addEventListener(name, callback);
			}
	
			/**
	   * Создаем и диспатчим событие
	   * @param  {[type]} data [description]
	   * @return {[type]}      [description]
	   */
	
		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				var widgetEvent = new CustomEvent(name, {
					bubbles: true,
					// detail - стандартное свойство CustomEvent для произвольных данных
					detail: data
				});
	
				this.el.dispatchEvent(widgetEvent);
			}
	
			/**
	  * Отправка данных формы
	  * @param {Event} event
	  * @private
	  */
	
		}, {
			key: '_onSubmit',
			value: function _onSubmit(event) {
				event.preventDefault();
	
				this.trigger('add', {
					href: this.getField('href').value,
					anchor: this.getField('anchor').value
				});
	
				event.target.reset();
			}
		}]);
	
		return Form;
	}();
	
	exports.Form = Form;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	
	var httpService = {
	
		/**
	  * Создаем и настраиваем экземпляр XMLHttpRequest
	  * @param  {string} method
	  * @param  {string} url
	  * @param  {Function} done
	  * @param  {Function} fail
	  * @return {XMLHttpRequest}
	  */
		_makeRequest: function _makeRequest(method, url, done, fail) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
	
			xhr.onreadystatechange = function (event) {
				if (xhr.readyState !== 4) {
					return;
				}
	
				if (xhr.status === 200) {
					done(xhr.responseText, xhr);
				} else {
					fail(xhr);
				}
			};
	
			xhr.send();
	
			return xhr;
		},
	
	
		/**
	  * GET запрос
	  * @param  {string} url 
	  * @return {Promise}
	  */
		get: function get(url, done) {
			var _this = this;
	
			return new Promise(function (resolve, reject) {
				_this._makeRequest('GET', url, resolve, reject);
			});
		},
		post: function post() {
			throw new Error('method post shoud be relelized');
		}
	};
	
	//export
	exports.httpService = httpService;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map