'use strict';
const Sequelize = require('sequelize');


module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
   firstName: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: { 
         notNull: {
            msg: 'Please provide a value for "first name"',
          },
         notEmpty: {
            // custom error message
          msg: 'Please provide a value for "first name"',
         }
      },
    },

    lastName: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: { 
         notNull: {
            msg: 'Please provide a value for "last name"',
          },
         notEmpty: {
            // custom error message
          msg: 'Please provide a value for "last name"',
         }
      },
    }, 

    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      defaultValue: false, // set default value
    },
   
    password: {
      type: Sequelize.STRING,
     } 
   },  { sequelize });

   User.associate = (models) => {
      User.hasMany(models.Course, {
      //   as: 'director', // alias
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    };

  return User;
   };