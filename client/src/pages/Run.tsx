import { useParams } from "react-router";
import { useReduxDispatch } from "../redux";
import { post } from "../redux/results";
import { get, ISurveyDefinition } from "../redux/surveys";
import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import { useState, useEffect } from "react";

StylesManager.applyTheme("defaultV2");

const Run = () => {
  // useState
  const dispatch = useReduxDispatch();
  const { id } = useParams();
  const [survey, setSurvey] = useState<ISurveyDefinition | null>(null);

  useEffect(() => {
    (async () => {
      const surveyAction = await dispatch(get(id as string));
      const data = surveyAction.payload;
      const content = JSON.parse(data.content);
      setSurvey(content);
    })();
  }, []);

  const model = new Model(survey);
  model.onComplete.add((sender: Model) => {
    dispatch(
      post({
        postId: id as string,
        surveyResult: sender.data,
        surveyResultText: JSON.stringify(sender.data),
      })
    );
  });

  return (
    <>
      {survey ? (
        <div>
          <h1>{survey.title}</h1>{" "}
          <p style={{ paddingLeft: "1.5rem" }}>{survey.description}</p>
        </div>
      ) : (
        <p>"No survey"</p>
      )}
      <Survey model={model} />
    </>
  );
};

export default Run;
