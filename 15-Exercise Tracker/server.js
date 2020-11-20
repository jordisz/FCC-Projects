const express = require('express');
const mongo = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require("./userSchema");
const mongoose = require('mongoose');

//SETUP
mongoose.connect(process.env.MLAB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('public'))

//INDEX ROUTE
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//NEW USER POST ROUTE
app.post('/api/exercise/new-user', (req, res) => {
  let userName = req.body.username;
  UserModel.exists({user: userName}, function(err, result) {
      if (err) {
        res.send("ERROR");
        console.log(err);
      } else {
        if(result == false) {                     //if user doesn't exist in db
          let newUser = new UserModel({user: userName});
          newUser.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("New user " + userName + " added to db");
            res.json({username: userName, _id: doc._id}); 
          });     
        } else {                                    //if url already in db    
          res.send("username already exists");
        }
      }
  })
});

//USERS GET ROUTE -> Array with all users
app.get('/api/exercise/users', (req, res) => {
  UserModel.find({}, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//ADD EXERCISE POST ROUTE -> Date is optional, if no date supplied it will use current date. 
app.post('/api/exercise/add', (req, res) => {
  const userId = req.body.userId;
  let date = new Date();
  if(req.body.date && isValidDate(req.body.date)) { //Date has to be yyyy-mm-dd
    date = new Date(req.body.date);
  }
  let exercise = {
  description: req.body.description,
  duration: req.body.duration,
  date: date
  }
  if(mongoose.isValidObjectId(userId)){
    UserModel.exists({_id: userId}, function(err, result) {
      if(err) {
        res.send("ERROR");
        console.log(err);
      } else {
        if(result == false) {
          res.send(userId + " doesn't exist in the database");
        } else {
          UserModel.findByIdAndUpdate(
            userId,
            {$push: {exercises: exercise}},
            {new: true},
            function(err, doc) {
              if(err) {
                console.log(err);
              } else {
                  let desc = doc.exercises[doc.exercises.length -1].description;
                  let dur = doc.exercises[doc.exercises.length -1].duration;
                  let exDate = doc.exercises[doc.exercises.length -1].date;
                  res.json({
                    username: doc.user,
                    description: desc,
                    duration: dur,
                    _id: doc._id,
                    date: exDate.toDateString()
                  });
              }
          });
        }
      }
    });
  } else {
    res.send("Invalid user ID format");
  } 
});

//LOG GET ROUTE
//I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
app.get('/api/exercise/log', (req, res) => {
  let userId = req.query.userId; 
  UserModel.exists({_id: userId}, function(err, result) {
      if(err) {
        res.send("ERROR");
        console.log(err);
      } else {
        if(result == false) {
          res.send(userId + " doesn't exist in the database");
        } else {
          UserModel.findById(userId, function (err, doc){
            if(err) {
              res.send("ERROR");
              console.log(err);
            } else {
              let log = doc.exercises.map(ex => ({description: ex.description, duration: ex.duration, date: ex.date.toDateString()})); 

              if(req.query.from) {
                fromDate = new Date(req.query.from);
                log = log.filter(ex => new Date(ex.date) >= fromDate)  // We need date to be Date (not string), see line 123...
              }

              if(req.query.to) {
                toDate = new Date(req.query.to)
                log = log.filter(ex => new Date(ex.date) <= toDate)
              } 

              if(req.query.limit) {
                log = log.slice(0, req.query.limit)
              }

              res.json({
                _id: userId,
                username: doc.user,
                count: log.length,
                log: log
              });
            }
          })
        }
      }
  })
})

//Date format validator function
function isValidDate(dateString) {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})