import React from "react";

const QuizIntro = ({ title, desc, setShowIntro }) => {
  return (
    <div className="bg-blue-300  text-center mt-52 mx-auto top-60 left-auto w-2/3 h-2/3 text-white px-10 py-16 rounded-md flex flex-col gap-4">
      <span className="text-4xl font-semibold">QUIZ : {title}</span>
      <div>{desc}</div>
      <button
        className="bg-white rounded-md text-blue-300 px-3 py-2 mx-auto font-semibold"
        onClick={() => setShowIntro(false)}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizIntro;
