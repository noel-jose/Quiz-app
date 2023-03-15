const attemptReducer = (state = [], action) => {
  switch (action.type) {
    case "SAVE_ANSWER":
      return [...state, action.payload.data];
    case "CLEAR_ANSWER":
      return state.filter((answer) => answer.id != action.payload.id);
    default:
      return state;
  }
};

answers: [
  {
    id: questionId,
    selected: [],
  },
];
