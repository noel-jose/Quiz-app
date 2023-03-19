import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Quiz = ({ quiz, fetchQuizzes, setIsLoaded }) => {
  const deleteAQuiz = () => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/${quiz.id}`);
    setIsLoaded(false);
    fetchQuizzes();
    setIsLoaded(true);
  };
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3">
      <span className="">{quiz.title}</span>
      <span>{quiz.questions?.length}</span>
      <div>
        {quiz.questions?.length > 0 && (
          <button
            className="px-3 bg-green-400 py-2 text-white rounded-md mb-6 mx-3 text-sm"
            onClick={() => navigate(`attempt/${quiz.id}`)}
          >
            Attempt
          </button>
        )}
        <button
          className="px-3 bg-blue-400 py-2 text-white rounded-md mb-6 mx-3 text-sm"
          onClick={() => navigate(`create/${quiz.id}`)}
        >
          Edit
        </button>
        <button
          className="px-3 bg-red-400 py-2 text-white rounded-md mb-6 mx-3 text-sm"
          onClick={() => {
            deleteAQuiz();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Quiz;
