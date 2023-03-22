import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import axios from "axios";

const QuizzesContainer = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_BASE_URL)
        .then((response) => setQuizzes(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (isLoading) {
    return (
      <div class="flex items-center justify-center my-3">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3">
        <span className="font-semibold pb-5 text-xl">Quiz Name</span>
        <span className="font-semibold pb-5 text-xl">Number of questions</span>
        <span className="font-semibold pb-5 text-xl">Options</span>
      </div>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <Quiz
            key={quiz.id}
            quiz={quiz}
            fetchQuizzes={fetchQuizzes}
            setIsLoading={setIsLoading}
          />
        ))
      ) : (
        <h2>No quizzes currently available</h2>
      )}
    </div>
  );
};

export default QuizzesContainer;
