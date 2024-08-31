var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var connectionString = "mongodb://127.0.0.1:27017";
// var connectionString =
//   "mongodb+srv://mdfaizan7563:CBdDRlabLVLVx1QR@cluster0.b62wjy5.mongodb.net/?retryWrites=true&w=majority";

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h4>APP</h4>");
});

app.get("/task", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    // datebase name
    var database = clientObject.db("googlekeep");
    database
      .collection("task")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
///GET
app.get("/task/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("googlekeep");
    database
      .collection("task")
      .find({ Id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
// Add
app.post("/addtask", (req, res) => {
  var tasks = {
    Id: parseInt(req.body.Id),
    Title: req.body.Title,
    Date: new Date(req.body.Date),
    Description: req.body.Description,
  };
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("googlekeep");
    database
      .collection("task")
      .insertOne(tasks)
      .then(() => {
        console.log("Task Add to Cloud Database");
        res.end();
      });
  });
});
// Post
app.put("/edittask/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("googlekeep");
    database
      .collection("task")
      .updateOne(
        { Id: id },
        {
          $set: {
            Id: parseInt(req.body.id),
            Title: req.body.Title,
            Date: new Date(req.body.Date),
            Description: req.body.Description,
          },
        }
      )
      .then(() => {
        console.log("Record Updated to Cloud Databse");
      });
  });
});
// Delete
app.delete("/deletetask/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("googlekeep");
    database
      .collection("task")
      .deleteOne({ Id: id })
      .then(() => {
        console.log("Task deleted From Cloud");
        res.end();
      });
  });
});

app.listen(2028);
console.log(`Server Started : http://127.0.0.1:3500`);
