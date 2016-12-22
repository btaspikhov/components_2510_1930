

	const httpService = {

		/**
		 * Создаем и настраиваем экземпляр XMLHttpRequest
		 * @param  {string} method
		 * @param  {string} url
		 * @param  {Function} done
		 * @param  {Function} fail
		 * @return {XMLHttpRequest}
		 */
		_makeRequest (method, url, done, fail) {
			let xhr = new XMLHttpRequest();
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
			}

			xhr.send();

			return xhr;
		},

		/**
		 * GET запрос
		 * @param  {string} url 
		 * @return {Promise}
		 */
		get (url, done) {
			return new Promise((resolve, reject) => {
				this._makeRequest('GET', url, resolve, reject);
			});
		},

		post () {
			throw new Error('method post shoud be relelized');
		}
	};


	//export
	export {httpService};

