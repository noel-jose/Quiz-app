import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import axios from "axios";

const QuizzesContainer = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchQuizzes = () => {
    axios
      .get(process.env.REACT_APP_BASE_URL)
      .then((response) => setQuizzes(response.data));
  };

  useEffect(() => {
    fetchQuizzes();
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col">
      {isLoaded == true &&
        (quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <Quiz
              key={quiz.id}
              quiz={quiz}
              fetchQuizzes={fetchQuizzes}
              setIsLoaded={setIsLoaded}
            />
          ))
        ) : (
          <h2>No quizzes currently available</h2>
        ))}
    </div>
  );
};

export default QuizzesContainer;
