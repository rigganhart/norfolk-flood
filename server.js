var path = require("path");
var bodyParser = require("body-parser");
var express = require('express');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var bodyParser = require("body-parser");
var app = express();
var R = require("r-script");
var localDB = 'mongodb://localhost:27017/hackdata'

var Simulated_Collection = "simulated";
var Real_Collection = "real";
var Word_Cloud = "wordCloud";
var Income_Collection = "incomeRange";

app.use(express.static('public'));
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || localDB, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});




// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// Get simulated data
app.get("/sim", function(req, res) {
  db.collection(Simulated_Collection).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get simulated data.");
    } else {
      res.status(200).json(docs);
    }
  });
});
// get real data
app.get("/real", function(req, res) {
  db.collection(Real_Collection).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get real data.");
    } else {
      res.status(200).json(docs);
    }
  });
});
// get income levels
app.get("/income", function(req, res) {
  db.collection(Income_Collection).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get income data.");
    } else {
      res.status(200).json(docs);
    }
  });
});
// post real data
app.post("/real", function(req, res) {
	var word = req.body;
	db.collection(Real_Collection).insertOne(word, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new data.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
// post to word cloud
app.post("/wordCloud", function(req, res) {
	var newData = req.body;
	db.collection(Word_Cloud).insertOne(newData, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new word cloud word.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
