(function () {
 	'use strict';

	//import
	let Menu = window.Menu;
	let Form = window.Form;
	let Model = window.Model;
	let httpService = window.httpService;

	let menuModel = new Model({
		resource: 'https://components2510.firebaseio.com/menu/-KZbcV-H6EQRXPvfKhx_.json',
		data: {}
	});

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		onPick (item) {
			console.log(item);
		},
		onRemove () {}
	});

	menuModel.on('update', data => {
		menu.setData(data);
		menu.render();
	});


	let form = new Form({
		el: document.querySelector('.js-form')
	});

	form.on('add', event => {
		menu.addItem(event.detail); // обновляю интерфейс

		menuModel.setData(menu.getData()); // обновляю данные в моделе
		menuModel.save(); // сохраняю изменения на сервере
	});

	menuModel.fetch();



	httpService.get('/package.json').then(responseText => {
		console.log(`App version: ${JSON.parse(responseText).version}`);
	}, xhr => {
		console.error(`App version fetching failed!`);
	});

	




})();