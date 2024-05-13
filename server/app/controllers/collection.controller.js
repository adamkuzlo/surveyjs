const db = require("../models");
const Survey = db.collection;
const Op = db.Sequelize.Op;

// Create and Save a new survey
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a survey
  const survey = {
    title: req.body.title,
    description: req.body.description,
    content: JSON.stringify(req.body.content),
  };

  // Save survey in the database
  Survey.create(survey)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Forms.",
      });
    });
};

// Retrieve all surveys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Survey.findAll({ where: condition })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(400).send({
          message: err.message || "Cannot find survey.Empty data.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Forms.",
      });
    });
};

// Find a single survey with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Survey.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Form with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Form with id=" + id,
      });
    });
};

// Update a survey by the id in the request
exports.updateOne = (req, res) => {
  const id = req.params.id;
  const newContent = req.body.content; // Assuming new content is sent in the request body
  if (!newContent) {
    res.status(400).send({ message: "Content to update cannot be empty" });
    return;
  }
  Survey.update(
    { content: newContent },
    {
      // Explicitly updating the content field
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Form was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Form with id=${id}. Maybe Form was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Form with id=" + id,
      });
    });
};

// Delete a survey with the specified id in the request
exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Survey.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Form was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Form with id=${id}. Maybe Form was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Form with id=" + id,
      });
    });
};

// Delete all surveys from the database.
exports.deleteAll = (req, res) => {
  Survey.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Forms were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all surveys.",
      });
    });
};
