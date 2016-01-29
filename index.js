/**
 * Created by adam on 29/01/16.
 */
var http = require('http');
'use strict'

//module.exports = {
    function gimmeusers(options, callback){

        console.log(" to o -> "+JSON.stringify(typeof options)+" ");
        console.log(options);
        var error = {
            occurs : false,
            message : ''
        };
        var path = '?';
        var genders = ["female","male"];
        var nationalities = ["gb","us","au","es","fi","fr","ie","nl"];
        var formats = ["csv","sql","yaml"];
        var defaults = {
            path : ''
        };

        function addToPath(key,value){
            if(path.length!=1)
                path = path + '&'+key+"="+value;
            else
                path = path + key+"="+value;
        }

        function parseOptions(options, callback){
            if(options != undefined) {
                for (var key in options) {
                    if (key == 'results')
                        if (isNaN(options.results)) {
                            error.occurs = true;
                            error.message = "Bad options : options.results must number between 1 - 10000";
                            callback(error, null);
                        }
                        else if ((options.results < 0) || (options.results > 10000)) {
                            error.occurs = true;
                            error.message = "Bad options : options.results must number between 1 - 10000";
                        }
                        else {
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
                options = defaults;
            }
            callback(error);
        }

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
    };
//};

gimmeusers({},function(err, data){
    console.log(err);
    if(err){
        console.error(" END ERROR -> "+err.message);
    } else {
        if(data!=null)
            console.log(" DATA -> "+data);
    }
});