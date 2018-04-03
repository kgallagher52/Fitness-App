var mongoose   = require('mongoose');
// This is modal usally singular that is going to create the schema 

var imageSchema = new mongoose.Schema
    ({ 
       currentFile:{type:Array},
       name:{type: String}
    
}); 


var imageSchema = mongoose.model('image', imageSchema);

module.exports = imageSchema;
