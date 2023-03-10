const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TITLE_AND_DESC":
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
      };

    case "EDIT_QUIZ":
      return {
        ...state,
        ...action.payload.quiz,
      };
  }
};
