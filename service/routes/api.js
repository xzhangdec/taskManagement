const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//MongoDB URL
const taskDB = 'mongodb://localhost:27017/taskAssign';

//Connect to DB
mongoose.connect(taskDB);


//Defining a model ==> create mongoose Schema
const Schema =  mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  startDate: { type: Date, default: Date.now},
  dueDate: { type: Date, default: Date.now},
  id: { type: Number, default: -1 },
});


const userSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  imgUrl: String,
  address: String,
  city: String
});

//Accessing a model
const Task  = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


/**
 * User related
 */
router.route('/users')

  //Create a new user
  .post((req, res)=> {
      const user = new User({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        imgUrl: req.body.imgUrl,
        address: req.body.address,
        city: req.body.city
    });
    user.save((err)=> {
      if(err) console.error(err.stack);
    });
    res.status(201).json({
      message:"user created successfully",
    });
  })

  //Get all users
  .get((req, res) => {
    User.find({}, (err, users) => {
      if (err) res.sendStatus(500);
      res.status(200).json(users);
    });
  });


//Get one User
router.get('/users/:id', (req, res)=> {
  User.findById(req.param.id, (err, users) => {
    if(err) res.sendStatus(500);
    res.status(200).json(users)
  });
});


router.route('/users/:user_id')
//Get specific User
  .get((req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  })
  //Update a User
  .put((req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);
      const newUser = user;
      newUser.name = req.body.name || user.name;
      newUser.age = req.body.age || user.age;
      newUser.gender = req.body.gender || user.gender;
      newUser.imgUrl = req.body.imgUrl || user.imgUrl;
      newUser.address = req.body.address || user.address;
      newUser.save((saveErr) => {
        if (saveErr) res.send(saveErr);
        res.json({message: 'User Updated!'});
      });
    });
  })
  //Delete a User
  .delete((req, res) => {
    User.remove({ _id: req.params.user_id }, (err) => {
      if (err) res.send(err);
      res.json({ message: 'Successfully Deleted!' });
    });
  });

/**
 * Task related
 */
router.route('/tasks')

//Create a new task
  .post((req, res)=> {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      id: req.body.id,
    });

    task.save((err)=> {
      if(err) console.error(err.stack);
    });
    res.status(201).json({
      message:"Task created successfully",
    });
  })

  //Get all tasks
  .get((req, res) => {
    Task.find({}, (err, users) => {
      if (err) res.sendStatus(500);
      res.status(200).json(users);
    });
  });


//Get one Task
router.get('/tasks/:id', (req, res)=> {
  Task.findById(req.param.id, (err, users) => {
    if(err) res.sendStatus(500);
    res.status(200).json(users)
  });
});


router.route('/tasks/:user_id')
//Get specific Task
  .get((req, res) => {
    Task.findById(req.params.task_id, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  })
  //Update a Task
  .put((req, res) => {
    Task.findById(req.params.task_id, (err, user) => {
      if (err) res.send(err);
      const newTask = task;
      newTask.name = req.body.title || user.title;
      newTask.age = req.body.description || user.description;
      newTask.gender = req.body.startDate || user.startDate;
      newTask.imgUrl = req.body.dueDate || user.dueDate;
      newTask.id = req.body.id || user.id;
      newTask.save((saveErr) => {
        if (saveErr) res.send(saveErr);
        res.json({message: 'Task Updated!'});
      });
    });
  })
  //Delete a Task
  .delete((req, res) => {
    User.remove({ _id: req.params.task_id }, (err) => {
      if (err) res.send(err);
      res.json({ message: 'Successfully Deleted!' });
    });
  });


module.exports = router;
