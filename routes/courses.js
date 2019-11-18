'use strict';

const express = require('express');
// create the Express app
const app = express();

// Imports sequelize models
const Course = require('../models').Course;
const User = require('../models').User;
// const Course = db.Course;
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
//return a list of all courses
router.get('/courses', asyncHandler(async (req, res) => {
   const courses = await Course.findAll({ });
  res.json({ courses})
  .status(200);
}));



module.exports = router;