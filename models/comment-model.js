var mongoose   = require('mongoose');
// This is modal usally singular that is going to create the schema 

var commentSchema = new mongoose.Schema ({
        name: {type: String},
        postId:{type:String, required: [true, "Post Id Rquired"]},
        userId: {type: String, required: [true, "User Id Required"]},
        comment:{type: String, required: [true, "Comment Required"]}, 
        image: {type: String},
        date: {type:String},


        

});


var comment = mongoose.model('comment', commentSchema);
module.exports = comment;
