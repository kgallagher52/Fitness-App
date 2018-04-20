var mongoose   = require('mongoose');
// This is modal usally singular that is going to create the schema 

var messageSchema = new mongoose.Schema ({
        name:   {type:String, required: [true, "Name Required"]},
        id:  {type:String},
        message: {type:String, required: [true, "Message Required"]},
        image: {type:String},

   
    
}); 


var message = mongoose.model('message', messageSchema);

module.exports = message;
