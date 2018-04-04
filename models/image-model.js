var mongoose   = require('mongoose');
// This is modal usally singular that is going to create the schema 

var imageSchema = new mongoose.Schema
    ({
        img: { type: String}, 
        currentUser:{type:String},
    
}); 


var imageSchema = mongoose.model('image', imageSchema);

module.exports = imageSchema;
