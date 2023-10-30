const { DataTypes } = require("sequelize");
const Sequelize = require("../db/database");

const user = Sequelize.define("users", {
//   id: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     //defaultValue: Sequelize.UUIDV4, // Default value for new records
//     primaryKey: true,
//     autoIncrement: true,
//     // validate: {
//     //   notEmpty: true,
//     // },
//   },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: "Name cannot be NULL",
      },
      //   notEmpty: {
      //     msg: "Name cannot be empty",
      //   },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

Sequelize.sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = user;

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../config/db");
// //const sequelize = new Sequelize('mysql://lordisrael:loveiman@localhost/person')

// const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.UUID, // Assuming UUIDs are stored as strings
//       primaryKey: true,
//       defaultValue: Sequelize.UUIDV4, // Default value for new records
//     },

//     email: {
//       unique: true,
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isEmail: {
//           msg: "Invalid email format.",
//         },
//         notNull: {
//           msg: "Email cannot be NULL",
//         },
//         notEmpty: {
//           msg: "Email cannot be empty",
//         },
//       },
//     },

//   },
//   {
//     timestamps: false,
//   }
// );

// sequelize.sync();
// module.exports = User;
// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User);
