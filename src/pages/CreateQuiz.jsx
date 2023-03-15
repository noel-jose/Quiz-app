import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Question from "../components/Question";
import QuestionListItem from "../components/QuestionListItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);

  const fetchAQuiz = (id) => {
    console.log(`${process.env.REACT_APP_BASE_URL}/${id}`);
    if (id != 0)
      axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`).then((response) => {
        setQuiz(response.data);
        setQuestions(response.data.questions);
        console.log(response.data);
      });
  };

  const saveAQuiz = () => {
    if (id == 0) {
      axios.post(
        process.env.REACT_APP_BASE_URL,
        JSON.stringify({
          id: Date.now(),
          title: quiz.title,
          desc: quiz.desc,
          questions: questions,
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
          id: Date.now(),
          title: quiz.title,
          desc: quiz.desc,
          questions: questions,
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
    console.log(quiz);
  }, []);

  const [showQuestion, setShowQuestion] = useState(false);
  const [currQues, setCurrQues] = useState();

  console.log(questions);
  console.log(quiz);

  useEffect(() => {}, []);

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
    const tempQues = {};
    tempQues.id = Date.now();
    tempQues.title = "";
    tempQues.type = "Single Select";
    tempQues.options = [];

    setCurrQues(tempQues);
    console.log(currQues);
    setShowQuestion(true);
    console.log(showQuestion);
    console.log("create Question Called");
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
          <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Quiz Title
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Title"
              value={quiz.title}
              onChange={(e) => {
                setQuiz((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>

          <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Quiz Description
            </label>
            <textarea
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                key={question.questionId}
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
              navigate("/");
            }}
          >
            Save Quiz
          </button>
        </div>

        <div className="border p-3 rounded-md">
          {showQuestion == true && (
            <Question
              key={currQues.questionId}
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
