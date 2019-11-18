'use strict';


const express = require('express');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
// Construct a router instance.
const router = express.Router();

// TODO
// GET /api/users 200 - Returns the currently authenticated user

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

module.exports = router;