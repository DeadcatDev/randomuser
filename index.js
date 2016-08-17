/**
 * Created by dev@deadcat.pl on 29/01/16.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');

var Randomuserme = function () {
	function Randomuserme(options) {
		_classCallCheck(this, Randomuserme);

		this.options = options;
		this.requestOptions = {
			hostname: 'api.randomuser.me',
			port: 80,
			path: this.parsePath(),
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		this.defaults = {
			path: '?',
			genders: ["female", "male"],
			nationalities: ["gb", "us", "au", "es", "fi", "fr", "ie", "nl"],
			formats: ["csv", "sql", "yaml"]
		};
		this.gimmeusers();
	}

	_createClass(Randomuserme, [{
		key: 'addToPath',
		value: function addToPath(path) {
			if (path.length != 1) path = path + '&' + key + "=" + value;else path = path + key + "=" + value;
		}
	}, {
		key: 'gimmeusers',
		value: function gimmeusers() {
			console.log(this.requestOptions);
			var request = http.request(this.requuestOptions, function (res) {
				var err = false,
				    data = {};

				request.on('error', function (e) {
					console.log("req error");
					console.error(" e -> ", e);
				});

				console.log('HEADERS: ' + JSON.stringify(res.headers));
				if (res.statusCode == 200) {
					res.setEncoding('utf8');
					res.on('data', function (chunk) {
						data += chunk;
						console.log("res data");
					});
					res.on('end', function () {
						console.log("res end");
						// callback(err, data);
					});
					res.on('error', function () {
						console.log(' Conn error -> ', res);
						// callback(err, null);
					});
				} else {
						console.log("error status code");
						// callback("Status code Error"+res.statusCode, null);
					}
			});
		}
	}, {
		key: 'parsePath',
		value: function parsePath() {
			console.log(this.options);
			if (this.options != undefined) {
				for (var key in options) {
					if (key == 'results') if (isNaN(options.results)) {
						error.occurs = true;
						error.message = "Bad options : options.results must number between 1 - 10000";
						callback(error, null);
					} else if (options.results < 0 || options.results > 10000) {
						error.occurs = true;
						error.message = "Bad options : options.results must number between 1 - 10000";
					} else {
						addToPath(key, options[key]);
					}
					if (key == 'gender') if (genders.indexOf(options[key]) > -1) {
						addToPath(key, options[key]);
					} else {
						error.occurs = true;
						error.message = 'Bad options : options.gender must be "male" or "female"';
					}
					if (key == 'seed') if (typeof options.seed == "string") {
						addToPath(key, options[key]);
					} else {
						error.occurs = true;
						error.message = 'Bad options : options.seed must be typeof string';
					}
					if (key == 'nat') {
						if (nationalities.indexOf(options[key]) > -1) {
							addToPath(key, options[key]);
						} else {
							error.occurs = true;
							error.message = 'Bad options : options.nat must be one of following : gb, us, au, es, fi, fr, ie or nl';
						}
					}
					if (key == 'format') {
						if (formats.indexOf(options[key]) > -1) {
							addToPath(key, options[key]);
						} else {
							error.occurs = true;
							error.message = 'Bad options : options.format must be one of following : csv,sql or yaml';
						}
					}
					if (key == 'key') {
						addToPath(key, options[key]);
					}
				}
			} else {
				return '';
			}

			// if(path == '?')
			// 	path='/';
			// else
			// 	path= '/'+path;
		}
	}, {
		key: 'sendRequest',
		value: function sendRequest() {

			// request.on('error', function(e) {
			// 	callback(e, null);
			// });
			// request.end();
		}
	}]);

	return Randomuserme;
}();

module.exports = Randomuserme;