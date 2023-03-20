import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import QuizIntro from "../components/QuizIntro";
import QuizOutro from "../components/QuizOutro";
import AttemptQuestion from "../components/AttemptQuestion";
import { useSelector } from "react-redux";

const AttemptQuiz = () => {
  const { id } = useParams();
  const answers = useSelector((state) => state.attempt);

  const [quiz, setQuiz] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [score, setScore] = useState(0);

  const fetchAQuiz = (id) => {
    if (id != 0)
      axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`).then((response) => {
        setQuiz(response.data);
        setIsLoaded(true);
      });
  };

  const calculateScore = (answers, correctAnswers) => {
    let s = 0;
    answers.map((answer) => {
      const answerId = answer.id;
      const index = correctAnswers.findIndex((item) => item.id == answerId);
      const cAns = correctAnswers[index].correctAnswers;
      if (cAns.every((r) => answer.selected.includes(r))) s = s + 1;
    });
    setScore(s);
  };

  useEffect(() => {
    fetchAQuiz(id);
  }, []);

  return (
    <div className="container mx-auto">
      {showIntro && (
        <QuizIntro
          title={quiz.title}
          desc={quiz.desc}
          setShowIntro={setShowIntro}
        />
      )}
      {showOutro && (
        <QuizOutro score={score} total={quiz.questions?.length} id={quiz.id} />
      )}
      {showIntro == false && showOutro == false && (
        <div>
          <h1 className="text-3xl font-semibold my-12">
            Attempt Quiz : {quiz.title}
          </h1>
          <div>
            {isLoaded &&
              quiz.questions.map((question, index) => {
                return (
                  <AttemptQuestion
                    key={question.id}
                    question={question}
                    index={index}
                  />
                );
              })}
            <button
              className="m-2 text-center px-3 bg-blue-400 py-2 text-white rounded-md  text-sm"
              onClick={() => {
                setShowOutro(true);
                calculateScore(answers, quiz.correctAnswers);
              }}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptQuiz;
