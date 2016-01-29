/**
 * Created by adam on 29/01/16.
 */
var http = require('http');
'use strict'

//module.exports = {
    function gimmeusers(options, callback){

        console.log(" to o -> "+JSON.stringify(typeof options)+" ");
        
        var defaults = {
            path : ''
        };

        if(options != undefined){
            if(options.results!=undefined){
                if(isNaN(options.results)){
                    callback('Not a NUmber', null);
                }
            }
        } else {
            options = defaults;
        }


        var reqestOptions = {
            hostname: 'api.randomuser.me',
            port: 80,
            path: options.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        /**
         * ?results=1-10k
         * &key=ABCD-1234-EFGH-5678
         * gender=female/male
         * seed='string'
         * format=csv,sql,yaml
         * nat=gb/us/au/es/fi/fr/ie/n;
         */

        var request = http.request(reqestOptions, function(res) {
            console.log('STATUS: '+res.statusCode);
            console.log('HEADERS: '+JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log('BODY: '+chunk);
            });
            res.on('end', function() {
                console.log('No more data in response.')
            })
        });

        request.on('error', function(e) {
            console.log('problem with request: '+e);
        });

        // write data to request body
        request.end();
    };
//};
gimmeusers({"results":'adwa'});