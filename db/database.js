const sequelize = require("sequelize");
const dotenv = require("dotenv"); // Import dotenv
// Load environment variables from .env
dotenv.config();

const Sequelize = new sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_SERVER,
    dialect: process.env.MYSQL_DIALECT,
  }
);

Sequelize.authenticate()
  .then(() => {
    console.log("Sequelize succesful");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });

module.exports = Sequelize;
