/**
 * Created by dev@deadcat.pl on 29/01/16.
 */
'use strict';
const http = require('http');

class Randomuserme{
	constructor(options){
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
			path : '?',
			gender : ["female","male"],
			nat : ["au", "br", "ca", "ch", "de", "dk", "es", "fi", "fr", "gb", "ie", "ir", "nl", "nz", "tr", "us"],
			formats : ["json", "prettyJSON", "pretty", "csv", "sql", "yaml"],
            incExc : ["gender", "name", "location", "email", "login", "registered", "dob", "phone", "cell", "id", "picture", "nat"]
		};
		this.gimmeusers();
	}

	addToPath(path){
		if(path.length!=1)
			path = path + '&'+key+"="+value;
		else
			path = path + key+"="+value;
	}

	gimmeusers(){
		console.log("THI.REQUEST -> ", this.requestOptions);
		let request = http.request(this.requestOptions, function(res) {
            let data;

			console.log('HEADERS: '+JSON.stringify(res.headers));
			if(res.statusCode==200){
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					data += chunk;
				});
				res.on('end', function() {
					console.log('data -> ', data);
				});
			} else {
				console.log("error status code");
			}
		});

		request.on('error', (e) => {
                console.log("req error");
            console.error(" e -> ",e);
        });
        request.end();
	}

	parsePath(){
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
		if(this.options != undefined) {
			for (var key in options) {
				if (key == 'results')
					if (isNaN(options.results)) {
						error.occurs = true;
						error.message = "Bad options : options.results must number between 1 - 10000";
						callback(error, null);
					} else
					if ((options.results < 0) || (options.results > 10000)) {
						error.occurs = true;
						error.message = "Bad options : options.results must number between 1 - 10000";
					} else {
						addToPath(key, options[key]);
					}
				if (key == 'gender')
					if (genders.indexOf(options[key]) > -1) {
						addToPath(key, options[key]);
					}
					else {
						error.occurs = true;
						error.message = 'Bad options : options.gender must be "male" or "female"';
					}
				if (key == 'seed')
					if (typeof options.seed == "string") {
						addToPath(key, options[key]);
					}
					else {
						error.occurs = true;
						error.message = 'Bad options : options.seed must be typeof string';
					}
				if (key == 'nat') {
					if (nationalities.indexOf(options[key]) > -1) {
						addToPath(key, options[key]);
					}
					else {
						error.occurs = true;
						error.message = 'Bad options : options.nat must be one of following : gb, us, au, es, fi, fr, ie or nl';
					}
				}
				if (key == 'format') {
					if (formats.indexOf(options[key]) > -1) {
						addToPath(key, options[key]);
					}
					else {
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
}

module.exports = Randomuserme;


