import React from "react";

const QuestionListItem = ({ question, editQuestion, deleteQuestion }) => {
  return (
    <div className="border rounded-md py-5 px-10 m-2 flex justify-between">
      <span>{question.title}</span>
      <div>
        <button
          className="px-3 bg-blue-500 py-1 text-white rounded-md  mx-2 text-sm"
          onClick={() => editQuestion(question)}
        >
          Edit
        </button>
        <button
          className="px-3 bg-red-500 py-1 text-white rounded-md  mx-2 text-sm"
          onClick={() => deleteQuestion(question.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuestionListItem;
