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
		this.response = {};
		this.error = {
			error: false,
			massage: ''
		};
		this.requestOptions = {
			host: 'api.randomuser.me',
			port: 80,
			path: this.parsePath(),
			method: 'GET'
		};
		this.defaults = {
			path: '',
			gender: ["female", "male"],
			nat: ["au", "br", "ca", "ch", "de", "dk", "es", "fi", "fr", "gb", "ie", "ir", "nl", "nz", "tr", "us"],
			formats: ["json", "prettyJSON", "pretty", "csv", "sql", "yaml"],
			incExc: ["gender", "name", "location", "email", "login", "registered", "dob", "phone", "cell", "id", "picture", "nat"],
			mic: ["dl", "noinfo", "callback"]
		};
		this.gimmeusers();
	}

        function addToPath(key,value){
            if(path.length!=1)
                path = path + '&'+key+"="+value;
            else
                path = path + key+"="+value;
        }

				console.log('HEADERS: ' + JSON.stringify(res.headers));
				if (res.statusCode == 200) {
					res.setEncoding('utf8');
					res.on('data', function (chunk) {
						data += chunk;
					});
					res.on('end', function () {
						console.log('data -> ', data);
					});
				} else {
					console.log("error status code");
				}
			});

			request.on('error', function (e) {
				console.log("req error");
				console.error(" e -> ", e);
			});
			request.end();
		}
	}, {
		key: 'parsePath',
		value: function parsePath() {
			console.log(this.options);
			// seed=foobar
			// page=3&results=10&seed=abc

			// INCLUDE (ONLY) or EXCLUDE (FROM FULL SET)
			// inc=gender,name,nat || exc=gender,name etc. for

			// results=5000 for 1-5000
			// gender=female || male
			// nat=AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NL, NZ, TR, US
			// format=csv for json, pretty, PrettyJSON, CSV, YAML, XML
			// dl (download ...)
			// noinfo (no info from system)

			// callback=randomuserdata (test it)
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
		}
	}]);

        parseOptions(options, function(error){
            if(!error.occurs){
                if(path == '?')
                    path='/';
                else
                    path= '/'+path;
                
                var reqestOptions = {
                    hostname: 'api.randomuser.me',
                    port: 80,
                    path: path,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                var request = http.request(reqestOptions, function(res) {
                    var err = false;
                    var data = {};
                    console.log('HEADERS: '+JSON.stringify(res.headers));
                    if(res.statusCode==200){
                        res.setEncoding('utf8');
                        res.on('data', function(chunk) {
                            data += chunk;
                        });
                        res.on('end', function() {
                            callback(err, data);
                        })
                    } else {
                        callback("Status code Error"+res.statusCode, null);
                    }
                });

                request.on('error', function(e) {
                    callback(e, null);
                });
                request.end();
            } else {
                console.error(" ERROR -> "+JSON.stringify(error.message));
            }
        });
    }
};
