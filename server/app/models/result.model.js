module.exports = (sequelize, Sequelize) => {
  const Result = sequelize.define("result", {
    postId: {
      type: Sequelize.STRING,
    },
    surveyResult: {
      type: Sequelize.JSON,
    },
    surveyResultText: {
      type: Sequelize.STRING,
    },
  });
  return Result;
};
