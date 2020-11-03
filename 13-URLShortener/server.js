'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dns = require('dns');
const UrlModel = require("./urlschema");

// Basic Configuration 
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(express.urlencoded({extended: true}));

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

//I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
//If I pass an invalid URL, the JSON response will contain an error
app.post("/api/shorturl/new", function (req, res) {
  let inputUrl = req.body.url;
  try {
    let urlObject = new URL(inputUrl);
    dns.lookup(urlObject.hostname, (err, address) => {
    if (err && err.code === 'ENOTFOUND') {
      res.json({
        error: "invalid URL"
      });
      console.log("dns lookup error: " + urlObject.hostname);
    } else if (urlObject.protocol != "https:" && urlObject.protocol != "http:") {
        res.json({
        error: "invalid URL"
      });
      console.log("invalid protocol: " + urlObject.hostname);
    } else {  // search for urlObj in the database
      UrlModel.exists({original: inputUrl}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        if(result == false) {                     //if url doesn't exist in db
          UrlModel.countDocuments({}, function(err, count) {
            let urlIndex = count + 1;
            let newUrl = new UrlModel({original: inputUrl, short: urlIndex});
            newUrl.save(function (err) {
              if (err) return handleError(err);
            });
          console.log("New adress " + inputUrl + " added to db (index " + urlIndex +")");
          res.json({original_url: inputUrl, short_url: urlIndex});
          }); 
        } else {                                    //if url already in db
          UrlModel.find({original: inputUrl}, function(err, data) {
            res.json({original_url: data[0].original, short_url: data[0].short});
          });
        }
      }
    });
    }
  });
  } catch (error) {
          res.json({
        error: "invalid URL"
      });
      console.log("Invalid input: " + inputUrl)
  }
})

// When I visit the shortened URL, it will redirect me to my original link.
app.get("/api/shorturl/:num", function (req, res) {
  let num = req.params.num;
  UrlModel.exists({short: num}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      if(result == false) {   
        res.send("Adress doesn't exist :(")
      } else {
        UrlModel.find({short: num}, function(err, data) {
          res.redirect(data[0].original);
          console.log("User redirected to " + data[0].original);
        });
      }
    }
  })
})


app.listen(port, function () {
  console.log('App is listening on port ' + port);
});