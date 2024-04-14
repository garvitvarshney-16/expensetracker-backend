import Sequelize from "sequelize";

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  logging: false,
  dialect: "mysql",
});


export const connectDB = async () => {
  try {
    const connection = await sequelize.authenticate()
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Mysql connection error ", error);
    process.exit(1);
  }
}

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database: ", error);
//   });

export default connectDB;
