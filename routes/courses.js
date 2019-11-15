'use strict';


const express = require('express');
// create the Express app
const app = express();

// Imports sequelize models
const Course = require('../models').Course;
const User = db.User;
// const Course = db.Course;
const router = express.Router();

// router.get('/', asyncHandler(async (req, res) => {
//    const books = await Book.findAll({ order: [[ "year", "DESC" ]] });
//   res.render('index', { books, title: 'Books' });
// }));

router.get('/courses', async (res, req) => {
   const courses = await Course.findAll({})
   .json(courses)
   res.status(200)
})

module.exports = router;