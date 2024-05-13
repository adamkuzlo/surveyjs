const db = require("../models");
const Result = db.result;
const Op = db.Sequelize.Op;

// Create and Save a new result
// api/result/create
// post method
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.postId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //   const content = JSON.stringify(req.body.content);
  // Create a survey
  const result = {
    postId: req.body.postId,
    surveyResult: req.body.surveyResult,
    surveyResultText: req.body.surveyResultText,
  };

  // Save survey in the database
  Result.create(result)
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
// api/result/get-all
// get method
exports.findAll = (req, res) => {
  // const content = req.query.surveyResult;
  // var condition = content ? { content: { [Op.like]: `%${content}%` } } : null;
  Result.findAll()
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.send(console.log("hello survey"));
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Forms.",
      });
    });
};

// Find a single survey with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Result.findByPk(id);

    if (!data) {
      return res.status(404).send({
        message: `Cannot find Form with id=${id}.`,
      });
    }
    // Convert surveyResult object to an array of objects
    const surveyResult = JSON.parse(data.surveyResult);
    const surveyResultArray = Object.keys(surveyResult).map((key) => ({
      [key]: surveyResult[key],
    }));

    const response = {
      id: data.id,
      surveyResult: surveyResultArray,
    };

    return res.send(response);
  } catch (err) {
    return res.status(500).send({
      message: "Error retrieving Form with id=" + req.params.id,
    });
  }
};

// find by id
exports.findAllById = (req, res) => {
  const id = req.params.id;
  // Check if id is provided in the query parameter
  if (!id) {
    return res.status(400).send({
      message: "ID parameter is required to retrieve data by ID.",
    });
  }

  Result.findAll({
    where: { postId: id },
  })
    .then((data) => {
      if (data.length > 0) {
        // Respond with an array of objects with the same id
        const surveyResultArray = data.map((item) =>
          JSON.parse(item.surveyResult)
        );
        const response = {
          id: data.id,
          surveyResult: surveyResultArray,
        };
        res.send(response);
      } else {
        res.send("No data found for the provided ID.");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data by ID.",
      });
    });
};
