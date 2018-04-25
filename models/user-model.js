var mongoose   = require('mongoose');
var bcrypt     = require('bcrypt');
// This is modal usally singular that is going to create the schema 

var userSchema = new mongoose.Schema
    ({ 
        name: {type: String, required: [true, "Name Required"]}, 
        email: {type: String, required: [true, "Email Required"]},
        pw: {type: String, required: [true, "Password Required"]},
        profileImg: {type: String},
        isAdmin: {type: Boolean, default: false}
    
    });

// Function that will crypt the password and when its incrypted do the the callback function
 userSchema.methods.setPassword = function (password, callback) {
    var user = this;
    bcrypt.hash(password, 12).then(function (hash) {
         user.pw = hash;
         callback();
     });
 };

 userSchema.methods.validPassword = function (password, callback) {
     bcrypt.compare(password, this.pw).then(function (valid) {
        callback(valid);
     });
     
 };
// This is collecting the data I want once I have a user being called from get session
 userSchema.methods.currentUser = function () {
     return {
        name: this.name,
        profileImg: this.profileImg,
        email: this.email,
        id: this.id
     };
 };
  
var User = mongoose.model('User', userSchema);

module.exports = User;
