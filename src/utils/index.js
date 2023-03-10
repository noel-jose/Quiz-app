import axios from "axios";

export const fetchQuizzes = () => {
  axios
    .get(process.env.REACT_APP_BASE_URL)
    .then((response) => console.log(response.data));
};

export const fetchAQuiz = (id) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/${id}`)
    .then((response) => console.log(response.data));
};

export const updateQuiz = (id, newQuiz) => {
  axios
    .put(`${process.env.REACT_APP_BASE_URL}/${id}`, JSON.stringify(newQuiz), {
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => console.log(response));
};

export const addQuiz = (quiz) => {
  axios.post(process.env.REACT_APP_BASE_URL, JSON.stringify(quiz), {
    headers: {
      "Content-type": "application/json",
    },
  });
};
