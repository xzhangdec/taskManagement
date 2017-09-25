//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/taskAssign';

/**
 * User related
 */

//Create a new user
router.post('/users', (req, res)=> {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const user = {
      "name": req.body.name,
      "age": req.body.age,
      "gender": req.body.gender,
      "imgUrl": req.body.imgUrl,
      "address": req.body.address,
      "title": req.body.title,
      "phone": req.body.phone,
      "email": req.body.email,
      "tasksId": []
    };

    db.collection("users").insertOne(user, function(err, ret) {
      if (err) throw err;
      db.close();
    });

    res.status(201).json({
      message:"User created successfully",
    });
  });
});


router.route('/users')
  //Get all users
  .get((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      db.collection("users").find({}).toArray(function(err, users) {
        if (err) throw err;
        db.close();
        res.status(200).json(users);
      });
    });
  });


//Get one User

router.route('/users/:user_id')
  .get((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("users").findOne({ "_id": new ObjectId(req.params.user_id)}, function(err, user) {
        if (err) throw err;
        db.close();
        res.status(200).json(user);
      });
    });
  });

//Get user by name
router.route('/get_user_tasks_by_name/:user_name')
  .get((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("users").findOne({ "name": req.params.user_name}, function(err, user) {
        if (err) throw err;
        db.close();
        res.status(200).json(user["tasksId"]);
      });
    });
  });



router.route('/users/:user_id')
//Get specific User
  //Update a User
  .put((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var query = {"_id": new ObjectId(req.params.user_id)};
      var newVal = {
        "name": req.body.name,
        "age": req.body.age,
        "gender": req.body.gender,
        "imgUrl": req.body.imgUrl,
        "address": req.body.address,
        "title": req.body.title,
        "phone": req.body.phone,
        "email": req.body.email,
        "tasksId": []
      };
      db.collection("users").updateOne(query, newVal, function (err, ret) {
        if (err) throw err;
        db.close();
        res.status(200).json({message: 'User Updated!'});
      });
    });
  })
  //Delete a User
  .delete((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var query = {"_id": new ObjectId(req.params.user_id)};
      db.collection("users").deleteOne(query, function(err, obj) {
        if (err) throw err;
        db.close();
        res.status(200).json({ message: 'Successfully Deleted!' });
      });
    });
  });


//Push Array:

router.route('/push_TasksId/:user_id')
  .put((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var query = {"_id": new ObjectId(req.params.user_id)};
      var newVal = {
        $push:{
          "tasksId":req.body._id
        }
      };
      db.collection("users").update(query, newVal, function (err, ret) {
        if (err) throw err;
        db.close();
        res.status(200).json({message: req.body._id});
      });
    });
  });


/**
 * Task related
 */

//Create a new task
  router.post('/tasks', (req, res)=> {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      const task = {
        "title": req.body.title,
        "description": req.body.description,
        "startDate": req.body.startDate,
        "dueDate": req.body.dueDate,
        "status": false,
        "usersId": [],
        "located":req.body.located,

      };

      db.collection("tasks").insertOne(task, function (err, ret) {
        if (err) throw err;
        db.close();
      });

      res.status(201).json();
    });
  });

  //Get all tasks
  router.get('/tasks', (req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      db.collection("tasks").find({}).toArray(function(err, tasks) {
        if (err) throw err;
        db.close();
        res.status(200).json(tasks);
      });
    });
  });



router.route('/tasks/:task_id')
  .get((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("tasks").findOne({ "_id": new ObjectId(req.params.task_id)}, function(err, task) {
        if (err) throw err;
        db.close();
        res.status(200).json(task);
      });
    });
  });

router.route('/tasks/:task_id')
  .delete((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("tasks").deleteOne({ "_id": new ObjectId(req.params.task_id)}, function(err, task) {
        if (err) throw err;
        db.close();
        res.status(200).json(task);
      });
    });
  });

//get task by name
router.route('/get_task_by_name/:task_name')
  .get((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("tasks").findOne({ "name": req.params.task_name}, function(err, task) {
        if (err) throw err;
        db.close();
        res.status(200).json(task);
      });
    });
  });

//Push Array:

router.route('/assign_task/:task_id')
  .put((req, res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var query = {"_id": new ObjectId(req.params.task_id)};
      var newVal = {
        $push:{
          "usersId":req.body._id
        }
      };
      db.collection("tasks").update(query, newVal, function (err, ret) {
        if (err) throw err;
        db.close();
        res.status(200).json({message: req.body.name});
      });
    });
  });


module.exports = router;
