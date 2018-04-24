var express         = require('express');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var userModel       = require('./models/user-model.js');
var imageSchema     = require('./models/image-model.js');
var messageModel    = require('./models/message-model.js');
var commentModel    = require('./models/comment-model.js');
var keys            = require('./config/keys.js');
var mongoose        = require('mongoose');
var serveStatic     = require('serve-static');
var passport        = require('passport');
var passportlocal   = require('passport-local');
var path            = require('path');
var Global          = require('./global.js');
var fs              = require('fs');
var crypto          = require('crypto');
var WebSocket       = require('ws');
var date            = require('moment');


var app = express();


// Using the middleware

// For Local env
// app.use(express.static('public'));

// For Productions
app.use(serveStatic(__dirname + "/"));

app.use(session({secret: 'Proggressionoverperfection', resave: false, saveUninitialized: true })); 
app.use(passport.initialize()); 
app.use(passport.session());

app.set('port', (process.env.PORT || 5050));



app.use(function (req, res, next) {
    // For local
    // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({ extended: false, limit: '500mb' }));




// Connect to mongo
    mongoose.connect(keys.mongodb.dbURI, () => {
        console.log('Connected to Database');
    });

// Passport/Session configurationz
passport.use(new passportlocal.Strategy({
        usernameField: 'email',
        passwordField: 'pw'
    },function (email, password, done) {
    userModel.findOne({ email: email }).then(function (user) {
        // No user
        if (!user) {
            // Need to return so function does not continue
            return done(null, false);
        }
        // No password this will be fired off in the user model
        // also checking to see if the user password matches
        user.validPassword(password, function (valid) {
            if (valid) {
                // Success we need to return the user with the response so
                // we can remember the user
                return done(null, user);

            } else {
                return done(null, false);

            }
        });
        // THis is in the case that the findOne failed
        }, function (err) {
            return done(err);
    });
    
}));

// Taking the user object and serlizing it into session data, so we
// can use that data later seralizing is taking something complicated talking it out
passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
passport.deserializeUser(function(id, done) {
    userModel.findOne({ _id: id }).then(function (user) {
        done(null, user);
    }, function (err) {
        done(err);
    });
  });

// Authentication Routes
app.post('/session', passport.authenticate('local'), function (req, res) {
    // On successful authentication
    res.sendStatus(201);

});


app.get('/session', function(req, res) {
    if (req.user) {
        res.json(req.user.currentUser());

    } else {
        res.sendStatus(401);
    }
});


app.delete('/session', function (req,res) {
    req.logout();
    res.sendStatus(200);
});

//_________________________________________________________________


// GETS____________________________________________________________
    // Get User
    app.get('/users/:email', function(req, res) {
        userModel.findOne({email: req.params.email}).then((currentUser) => {
            if(currentUser){
                res.set("Access-Control-Allow-Origin", "*");
                res.status(200).json(currentUser);
            } else {
                res.set("Access-Control-Allow-Origin", "*");
                res.status(404).json(currentUser);

            }
            
        });
    });

    app.get('/images', function(req, res) {
            // Sending reguler response
            image.find().then(function (images) {
                res.status(200).json(images);     
        });
    });

    app.get('/messages', function(req, res) {
        // Sending reguler response
        messageModel.find().then(function (messages) {
            res.status(200).json(messages);
        
        });
    });

    app.get('/comments', function(req, res) {
        // Sending reguler response
        commentModel.find().then(function (comments) {
            res.status(200).json(comments);
        
        });
    });

    app.get('/users/:email', function(req, res) {
        userModel.finda({email: req.params.email}).then((currentUser) => {
            if(currentUser){
                res.set("Access-Control-Allow-Origin", "*");
                res.status(200).json(currentUser);
            } else {
                res.set("Access-Control-Allow-Origin", "*");
                res.status(404).json(currentUser);

            }
            
        });
    });

    //Get Recipie

// POSTS___________________________________________________________________

// User posts
    app.post('/users', function (req, res) {
        console.log("Posting Users");
        userModel.findOne({email: req.body.email}).then((currentUser) => {
            if(currentUser) {
                // Already have the user
                res.set("Access-Control-Allow-Origin", "*");
                res.status(422).json("User Already Exists");
                
            } else {
            // This is making a variable that is == to the User variable which is my schema coming from the mongo.js in the modals folder
        var newUser = new userModel({
                name:   req.body.name,
                email:  req.body.email,
                profileImg: ''
            }); 
            
            newUser.setPassword(req.body.pw, function (password) {

            newUser.save().then(function () {
                res.set("Access-Control-Allow-Origin", "*");
                res.status(201).json(newUser);
            }, function (err) {
                if (err.errors) {
                    var messages = {};
                    for (var e in err.errors) {
                        messages[e] = err.errors[e].message;
                    }
                    res.status(422).json(messages);
                
                } else {
                    res.sendStatus(500);
                }
                console.log("User Created");

            });
    
        }); 
        }
    });
});


//  post images
app.post('/images', function (req, res) {
    
    var New = new imageSchema({
            img: req.body.image,
            currentUser: req.body.currentUser
            
        }); 
        
        New.save().then(function () {
            res.status(201).json(New);
        });     
});


// POST MESSAGES
app.post('/messages', function (req, res) {
    console.log("Posting messages");
    var newDate = new date().format('MMMM Do YYYY, h:mm a');

    var newMessage = new messageModel({
            name:       req.body.name,
            id:         req.body.id,
            message:    req.body.message,
            image:      req.body.image,
            date:       newDate       
        }); 
        
        newMessage.save().then(function () {
            res.status(201).json(newMessage);
        }, function (err) {
            if (err.errors) {
                var messages = {};
                for (var e in err.errors) {
                    messages[e] = err.errors[e].message;
                }
                res.status(422).json(messages);
            
            } else {
                res.sendStatus(500);
            }
            console.log("Message Created");

    });
});

app.post('/comments', function (req, res) {
    console.log("Posting Comments");
    var newDate = new date().format('MMMM Do YYYY, h:mm a');

    var newComment = new commentModel({
            name:       req.body.name,
            postId:     req.body.postId,
            userId:     req.body.userId,
            comment:    req.body.comment,
            image:      req.body.image,
            date:       newDate

        }); 
        
        newComment.save().then(function () {
            res.status(201).json(newComment);
        }, function (err) {
            if (err.errors) {
                var messages = {};
                for (var e in err.errors) {
                    messages[e] = err.errors[e].message;
                }
                res.status(422).json(messages);
            
            } else {
                res.sendStatus(500);
            }
            console.log("Message Created");

    });
});


// PUT____________________________________________________________
app.put('/users', function (req, res) {
    console.log("Posting Users");
    userModel.findOne({_id: req.body.currentUser}).then((currentUser) => {
        if(!currentUser) {
            // Already have the user
            res.set("Access-Control-Allow-Origin", "*");
            res.status(404).json("Couldn't Find User");
            
        } else { 

                currentUser.profileImg = req.body.image;
                currentUser.save().then(function () {
                res.set("Access-Control-Allow-Origin", "*");
                res.status(200).json(currentUser);
                
                       

        }, function (err) {
            if (err.errors) {
                var messages = {};
                for (var e in err.errors) {
                    messages[e] = err.errors[e].message;
                }
                res.status(422).json(messages);
            
            } else {
                res.sendStatus(500);
            }
            console.log("User Updated");

        }); 
        }
    });
});

app.put('/messages', function (req, res) {
    console.log("Posting message");
 
    messageModel.findOne({_id: req.body.postId}).then((message) => {
        if(!message) {
            res.status(404).json("Couldn't Find post");
            
        } else {

            message.message = req.body.message;
            message.save().then(function () {
            res.status(200).json(message);

        }, function (err) {
            if (err.errors) {
                var messages = {};
                for (var e in err.errors) {
                    messages[e] = err.errors[e].message;
                }
                res.status(422).json(messages);
            
            } else {
                res.sendStatus(500);
            }
            console.log("Post Updated");

        }); 
        }
    });
});


app.put('/comments', function (req, res) {
    console.log("Posting comments");
 
    commentModel.findOne({_id: req.body.commentId}).then((comment) => {
        if(!comment) {
            res.status(404).json("Couldn't Find post");
            
        } else {

            comment.comment = req.body.comment;
            comment.save().then(function () {
            res.status(200).json(comment);

        }, function (err) {
            if (err.errors) {
                var messages = {};
                for (var e in err.errors) {
                    messages[e] = err.errors[e].message;
                }
                res.status(422).json(messages);
            
            } else {
                res.sendStatus(500);
            }
            console.log("Comment Updated");

        }); 
        }
    });
});
  
// DELETE____________________________________________________________
app.delete('/messages/:postId', function(req, res) {
    console.log("DELETE METHOD BEING CALLED");
    var tempPostId = req.params.postId;
    messageModel.findOneAndRemove({_id: req.params.postId}).then((deleted) => {
        if(deleted){
            commentModel.find({postId: req.params.postId}).then((deleted) => {
                if(deleted){
                    
                    res.status(200).json(deleted);
        
                } else {
                    res.status(200).json(deleted);
        
                }
                
            });
     
        } else {
            res.status(404).json(deleted);

        }
        
    });
});

app.delete('/comments/:commentId', function(req, res) {
    console.log("DELETE METHOD BEING CALLED");
    commentModel.findOneAndRemove({_id: req.params.commentId}).then((deleted) => {
        if(deleted){
            res.status(200).json(deleted);

        } else {
            res.status(404).json(deleted);

        }
        
    });
});
// Commands to make server run in express
var server = app.listen(app.get('port'), function() {
        console.log("Server is listening...");

        var wss = new WebSocket.Server({ server: server });

        // Brodcast all to all clients whenever I want
        // wss.brodcast = function brodcast(data) {
        //     wss.clients.forEach(function each(client) {
        //         if (client.readyState === WebSocket.OPEN) {
        //             client.send(data);
        //         }
        //     });
        // };
    
        wss.on('connection', function(ws) {
            wss.clients.upgradeReq;

            ws.on('message', function (data) {
                var json = JSON.parse(data); 
                if (json.action == "updatePage") {
                    wss.clients.forEach(function (client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(data);
                    }
                
                });
            };
        
                // This is checking the client and when they send a messeage
                // brodcast the message
                //  Sending to only one client
            

            // Function for only seeing incoming messages
                // wss.clients.forEach(function (client) {
                //     if (client !== ws && client.readyState === WebSocket.OPEN) {
                //         client.send(data);
                //     }
                // });
        });
    });
});
