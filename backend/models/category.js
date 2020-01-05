var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name : {type:String, require:true},
    code: {type:String, require:true},
    creation_dt:{type:Date, require:true}
});

module.exports = mongoose.model('Category',schema);