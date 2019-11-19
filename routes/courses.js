'use strict';

const express = require('express');
// create the Express app
const app = express();

// Imports sequelize models
const Course = require('../models').Course;
const User = require('../models').User;
const router = express.Router();

/* Handler function to wrap each route. */
function asyncHandler(cb){
   return async(req, res, next) => {
     try {
       await cb(req, res, next)
     } catch(error){
       res.status(500).send(error);
     }
   }
 }
//return a list of all courses in json format
router.get('/courses', asyncHandler(async (req, res) => {
   const courses = await Course.findAll({ });
  res.json({ courses})
  .status(200);
}));

//Returns a the course for the provided course ID
router.get('/courses/:id', asyncHandler(async (req, res) => {
   const course = await Course.findByPk(req.params.id);
   res.json({course})
   .status(200);
}))

// Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/courses', asyncHandler(async (req, res, next) => {
   let course;
   try {
     course = await Course.create(req.body);
     res.location(`/courses/${course.id}`)
     .status(201).end();
   } catch (error) {
     if(error.name === "SequelizeValidationError") { // checking the error
      //  course = await Course.build(req.body);
       res.json({ errors: error.errors})
      } else {
         throw error; // error caught in the asyncHandler's catch block
       }  
     }
}))

module.exports = router;