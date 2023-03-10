import React from "react";
import { useState, useRef } from "react";

const Question = ({ question, addQuestion }) => {
  console.log(question);
  const [options, setOptions] = useState(question.options);
  const [quesTitle, setQuesTitle] = useState(question.title);
  const [quesType, setQuesType] = useState(question.type);

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      { optionId: Date.now(), optionValue: "", isCorrect: false },
    ]);
  };

  const handleCorrectOption = (id) => {
    setOptions(
      options.map((option) => {
        if (option.optionId == id)
          return { ...option, isCorrect: !option.isCorrect };
        else return option;
      })
    );
  };

  const handleEditOption = (e, id) => {
    const newValue = e.target.value;
    setOptions(
      options.map((option) => {
        if (option.optionId == id) return { ...option, optionValue: newValue };
        else return option;
      })
    );
  };

  const removeOption = (id) => {
    setOptions(options.filter((option) => option.optionId != id));
  };

  return (
    <>
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="question"
        >
          Question
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="question"
          type="text"
          value={quesTitle}
          onChange={(e) => setQuesTitle(e.target.value)}
        />
      </div>
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          State
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => setQuesType(e.target.value)}
            value={quesType}
          >
            <option>Single Select</option>
            <option>Multi Select</option>
            <option>Dropdown</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Showing the available options  */}

      {options.length > 0 && (
        <h3 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-6 px-3">
          Options
        </h3>
      )}

      <div className="w-full px-3 mb-6 md:mb-0 mt-6">
        {options.map((option) => (
          <div className="flex items-center mb-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-1 px-4  leading-tight focus:outline-none focus:bg-white"
              type="text"
              value={option.optionValue}
              onChange={(e) => handleEditOption(e, option.optionId)}
            />
            <button
              className="px-3 bg-red-500 py-1 text-white rounded-md  mx-2 text-sm"
              onClick={() => removeOption(option.optionId)}
            >
              Remove
            </button>
            <button
              className="px-3 bg-blue-400 py-1 text-white rounded-md  mx-1 text-xs"
              onClick={() => handleCorrectOption(option.optionId)}
            >
              {option.isCorrect == true ? "Set as Wrong" : "Set as Correct"}
            </button>
          </div>
        ))}
      </div>

      <button
        className="px-3 bg-blue-400 py-2 text-white rounded-md mb-6 mx-3 text-sm"
        onClick={(e) => {
          e.preventDefault();
          handleAddOption();
        }}
      >
        Add Options
      </button>

      <button
        className="px-3 bg-blue-400 py-2 text-white rounded-md mb-6 mx-3 text-sm"
        onClick={() =>
          addQuestion({
            questionId: question.questionId,
            title: quesTitle,
            type: quesType,
            options: options,
          })
        }
      >
        Save Question
      </button>
    </>
  );
};

export default Question;
