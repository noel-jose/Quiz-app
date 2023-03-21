import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Question from "../components/Question";
import QuestionListItem from "../components/QuestionListItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);

  const fetchAQuiz = (id) => {
    if (id != 0)
      axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`).then((response) => {
        setQuiz(response.data);
        setQuestions(response.data.questions);
      });
  };

  const correctAnswers = (questions) => {
    const correctAns = [];
    questions.map((question) => {
      correctAns.push({
        id: question.id,
        correctAnswers: question.correctAnswers,
      });
    });
    return correctAns;
  };

  const saveAQuiz = () => {
    if (id == 0) {
      axios.post(
        process.env.REACT_APP_BASE_URL,
        JSON.stringify({
          id: crypto.randomUUID(),
          title: quiz.title,
          desc: quiz.desc,
          questions: questions,
          correctAnswers: correctAnswers(questions),
        }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    } else {
      axios.put(
        `${process.env.REACT_APP_BASE_URL}/${id}`,
        JSON.stringify({
          id: crypto.randomUUID(),
          title: quiz.title,
          desc: quiz.desc,
          questions: questions,
          correctAnswers: correctAnswers(questions),
        }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    }
  };

  useEffect(() => {
    fetchAQuiz(id);
  }, []);

  const [showQuestion, setShowQuestion] = useState(false);
  const [currQues, setCurrQues] = useState();

  const addQuestion = (question) => {
    let isPresent = false;
    setQuestions(
      questions.map((q) => {
        if (q.id == question.id) {
          isPresent = true;
          return question;
        } else return q;
      })
    );
    if (isPresent == false) setQuestions((prev) => [question, ...prev]);
    setShowQuestion(false);
  };

  const createQuestion = () => {
    setShowQuestion(false);
    const tempQues = {
      id: crypto.randomUUID(),
      title: "",
      type: "Single Select",
      options: [],
    };
    
    setCurrQues(tempQues);
    setShowQuestion(true);
  };

  const editQuestion = (question) => {
    setCurrQues(question);
    setShowQuestion(false);
    setShowQuestion(true);
  };

  const deleteQuestion = (id) => {
    if (showQuestion == true && currQues.id == id) setShowQuestion(false);
    setQuestions(questions.filter((question) => question.id != id));
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-3xl font-semibold my-12">
          {id == 0 ? "Create Quiz" : "Edit Quiz"}
        </h1>
      </div>

      <main className="border rounded-md py-5 px-10 grid grid-cols-3 gap-3">
        <div className=" col-span-2 border p-3 rounded-md">
          <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Quiz Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Title"
              value={quiz.title}
              onChange={(e) => {
                setQuiz((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>

          <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Quiz Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Description"
              value={quiz.desc}
              onChange={(e) =>
                setQuiz((prev) => ({ ...prev, desc: e.target.value }))
              }
            />
          </div>

          {/* showing all the available questions  */}

          {quiz.questions?.length > 0 || questions ? (
            questions.map((question) => (
              <QuestionListItem
                question={question}
                key={question.id}
                editQuestion={editQuestion}
                deleteQuestion={deleteQuestion}
              />
            ))
          ) : (
            <p>No questions</p>
          )}

          <button
            className="px-3 bg-blue-400 py-2 text-white rounded-md mb-6 mx-3 text-sm"
            onClick={() => createQuestion()}
          >
            Create Question
          </button>

          <button
            className="px-3 bg-blue-400 py-2 text-white rounded-md mb-6 mx-3 text-sm"
            onClick={() => {
              saveAQuiz();
              correctAnswers(questions);
              navigate("/");
            }}
          >
            Save Quiz
          </button>
        </div>

        <div className="border p-3 rounded-md">
          {showQuestion == true && (
            <Question
              key={currQues.id}
              question={currQues}
              addQuestion={addQuestion}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateQuiz;
