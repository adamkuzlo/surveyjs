import { useParams } from "react-router";
import View from "../components/View";

const Result = () => {
  const { id } = useParams();

  return (
    <>
      <div className="sjs-results-container">
        <View id={id as string} />
      </div>
    </>
  );
};

export default Result;
