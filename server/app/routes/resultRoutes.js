module.exports = (app) => {
  const express = require("express");
  const result = require("../controllers/result.controller.js");

  const router = express.Router();

  router.get("/get-all", result.findAll);
  router.get("/get-one/:id", result.findAllById);
  router.post("/create", result.create);

  app.use("/api/result", router);
};
