/**
 * Created by adam.mroz on 17/05/16 for Evo.la
 * adam.mroz@applandeo.com
 */
var randomuser = require('../index.js');
randomuser.gimmeusers({},function(err, data){
    console.log(err);
    if(err){
        console.error(" END ERROR -> "+err.message);
    } else {
        if(data!=null)
            console.log(" DATA -> "+data);
    }
});
