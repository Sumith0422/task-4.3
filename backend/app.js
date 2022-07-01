const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./database/mogoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./database/models/user");
const Task = require("./database/models/task");

process.env.SECRET_KEY = "secret";

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  User.find({})
    .then(user => res.send(user))
    .catch(error => console.log(error));
});

app.post("/users", (req, res) => {
  new User({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })
    .save()
    .then(user => res.send(user))
    .catch(error => console.log(error));
});

//Register User
app.post("/users/register", (req, res) => {
  const today = new Date();
  const userData = {
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    date: today
  };

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              const payload = {
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email
              };
              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1440
              });
              res.json({ token: token });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

//Login User
app.post("/users/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.json({ token: token });
        } else {
          res.json({ error: "Password is incorrect " });
        }
      } else {
        res.json({ error: "User does not exist " });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

//Get to profile
app.get("/users/todo", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User doesnot exist");
      }
    })
    .catch(err => {
      res.send("error: ", err);
    });
});

app.get("/users/:userId", (req, res) => {
  User.find({
    _id: req.params.userId
  })
    .then(user => res.send(user))
    .catch(error => console.log(error));
});

app.get("/users/:userId/tasks", (req, res) => {
  Task.find({
    _userId: req.params.userId
  })
    .then(task => res.send(task))
    .catch(error => console.log(error));
});

app.post("/users/:userId/tasks", (req, res) => {
  new Task({
    _userId: req.params.userId,
    title: req.body.title
  })
    .save()
    .then(task => res.send(task))
    .catch(error => console.log(error));
});

app.delete("/users/:userId", (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .then(user => res.send(user))
    .catch(error => console.log(error));
});

app.patch("/users/:userId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    {
      _userId: req.params.userId,
      _id: req.params.taskId
    },
    { $set: req.body }
  )
    .then(task => res.send(task))
    .catch(error => console.log(error));
});

app.delete("/users/:userId/tasks/:taskId", (req, res) => {
  Task.findOneAndDelete({
    _userId: req.params.userId,
    _id: req.params.taskId
  })
    .then(task => res.send(task))
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log("Server Connected on port 3000"));
