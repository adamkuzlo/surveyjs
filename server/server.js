const express = require("express");
const cors = require("cors");
const app = express();
// const collectionRountes = require("./app/routes/collectionRoutes");
http: var corsOptions = {
  origin: [process.env.BASE_URL, "http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application!" });
});

//route
require("./app/routes/collectionRoutes")(app);
require("./app/routes/resultRoutes")(app);

//db sequelize
const db = require("./app/models");

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//in the development, need to drop existing tables and re-sync database with using 'force:true'
// console.log("Drop and re-sync db.");
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
