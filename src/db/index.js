import Sequelize from "sequelize";

export const sequelize = new Sequelize("u209925293_scala", "u209925293_sala", "Scalaproject@123", {
  host: "srv1127.hstgr.io",
  logging: false,
  dialect: "mysql",
});


export const connectDB = async () => {
  try {
    const connection = await sequelize.authenticate()
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("MongoDB connection error ", error);
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
