'use strict';

const express = require('express');
// Create the Express app
const app = express();
// Imports authenticate user function
const authenticateUser = require('../middleware/authUser.js')


// Imports sequelize model
const Course = require('../models').Course;
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
//Returns a list of all courses in json format
router.get('/courses', asyncHandler(async (req, res) => {
   const courses = await Course.findAll({ });
  res.json({courses})
  .status(200).end();
}));

//Returns a the course for the provided course ID
router.get('/courses/:id', asyncHandler(async (req, res) => {
   const course = await Course.findByPk(req.params.id);
   res.json({course})
   .status(200).end();
}))

// Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
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

// Updates a course and returns no content
router.put('/courses/:id', authenticateUser, (async (req, res, next) => {
   let course;
   try {
      course = await Course.findByPk(req.params.id);
      if (course){
      await course.update(req.body);
      res.status(204).end();
   }
   } catch (error) {
      if(error.name === "SequelizeValidationError"|| "SequelizeUniqueConstraintError") { // checking the error
       course = await Course.build(req.body);
       res.status(400).json({ errors: error.message})
      }      
      else {
         throw error; // error caught in the asyncHandler's catch block
       }  
     }
}))

// Deletes a course and returns no content
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
   let course;
      try {
         const course = await Course.findByPk(req.params.id);
         if (course) {
            await course.destroy()
            res.status(204).end();
           } 
         else {
           res.status(404).json({
             message: 'Course Not Found',
             });
         }
      } catch (error) {
         return next(error);
       }
     }));

module.exports = router;