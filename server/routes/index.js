// All routes and resposible to connectivity between Database and application
(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
 // var db = mongojs('mongodb://localhost:27017/umesh', ['employees']);
var db = mongojs('mongodb://umesh:umesh123@ds019491.mlab.com:19491/umesh', ['employees']);

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

    // Get all Employee Records
  router.get('/api/employees', function(req, res) {
    db.employees.find(function(err, data) {
      res.json(data);
    });
  });

    // Insert New Employee Record
  router.post('/api/employees', function(req, res) {
    db.employees.insert(req.body, function(err, data) {
      res.json(data);
    });

  });

 // Update Existing Employee Record
  router.put('/api/employees', function(req, res) {
    db.employees.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      name: req.body.name,
      email: req.body.email,
       department:req.body.department,
        gender:req.body.gender,
        dob:req.body.dob,
         age:req.body.age,
    }, {}, function(err, data) {
      res.json(data);
    });

  });

    // Delete Employee Record
  router.delete('/api/employees/:_id', function(req, res) {
    db.employees.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });

  });

  module.exports = router;

}());
