var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name : {type:String, require:true},
    category_id:{type:mongoose.Schema.Types.ObjectId, require:true, ref: 'Category'},
    code: {type: String, require:true},
    creation_dt:{type:Date, require:true}
});

module.exports = mongoose.model('Product',schema);