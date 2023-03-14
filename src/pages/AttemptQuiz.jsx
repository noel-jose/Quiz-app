import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AttemptQuiz = () => {
  const { id } = useParams();
  console.log(id);

  const [quiz, setQuiz] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchAQuiz = (id) => {
    console.log(`${process.env.REACT_APP_BASE_URL}/${id}`);
    if (id != 0)
      axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`).then((response) => {
        setQuiz(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    fetchAQuiz(id);
    setIsLoaded(true);
  }, []);

  return <div>AttemptQuiz</div>;
};

export default AttemptQuiz;
