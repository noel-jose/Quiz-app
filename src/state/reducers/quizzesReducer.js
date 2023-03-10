const intialState = [];
const quizzesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_QUIZ":
      return [...state, action.payload.quiz];

    case "REMOVE_QUIZ":
      return state.filter((quiz) => {
        quiz.id != action.payload.id;
      });
  }
};

export default quizzesReducer;
