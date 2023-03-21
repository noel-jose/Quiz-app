import React from "react";
import { useState } from "react";
import { saveAnswer } from "../state/actionCreator";
import { clearAnswer } from "../state/actionCreator";
import { useDispatch } from "react-redux";

const AttemptQuestion = ({ question, index }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState([]);

  const clearSelectedAnswer = () => {
    setAnswer([]);
  };

  const displayTheOptions = (question) => {
    switch (question.type) {
      case "Single Select":
        return (
          <div onChange={(e) => setAnswer([e.target.value])}>
            {question.options.map((option) => (
              <div key={option.id}>
                <input
                  type="radio"
                  checked={answer == option.value}
                  name=""
                  value={option.value}
                  onChange={(e) => setAnswer([e.target.value])}
                />
                <label htmlFor=""> {option.value}</label>{" "}
              </div>
            ))}
          </div>
        );

      case "Multi Select":
        return question.options.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              name=""
              checked={answer.includes(option?.value)}
              value={option.value}
              onChange={(e) =>
                setAnswer((prev) =>
                  prev.includes(option.value)
                    ? prev.filter((item) => item != option.value)
                    : [...prev, option.value]
                )
              }
            />{" "}
            <label htmlFor="">{option.value}</label>
          </div>
        ));
      case "Dropdown":
        return (
          <div>
            <select
              value={answer[0]}
              onChange={(e) => setAnswer([e.target.value])}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              {question.options.map((option) => (
                <option key={option.id}>{option.value}</option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-md py-5 px-10 m-2 flex flex-col justify-between items-start">
      <span>
        <span className="font-semibold">Q{index + 1}</span>. {question.title}
      </span>
      {displayTheOptions(question)}
      <div className="flex gap-2 my-3">
        {answer.length > 0 && (
          <button
            className="px-3 text-blue-400 py-2 border border-blue-200 rounded-md  text-sm"
            onClick={() => {
              clearSelectedAnswer();
              dispatch(clearAnswer(question.id));
            }}
          >
            Clear Answer
          </button>
        )}
        {answer.length > 0 && (
          <button
            className="px-3 bg-blue-400 py-2 text-white rounded-md  text-sm"
            onClick={() => dispatch(saveAnswer(question.id, answer))}
          >
            Save Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default AttemptQuestion;
