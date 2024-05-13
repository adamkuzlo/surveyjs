module.exports = (app) => {
  const express = require("express");
  const collection = require("../controllers/collection.controller.js");

  const router = express.Router();

  router.get("/get-all", collection.findAll);
  router.get("/get-one/:id", collection.findOne);
  router.post("/create", collection.create);
  router.put("/update/:id", collection.updateOne);
  router.delete("/delete-one/:id", collection.deleteOne);
  router.delete("/delete-all", collection.deleteAll);

  app.use("/api/collection", router);
};
