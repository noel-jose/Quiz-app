const attemptReducer = (state = ["hello", "noel"], action) => {
  switch (action.type) {
    case "SAVE_ANSWER":
      let isPresent = false;
      const newState = state.map((item) => {
        if (item.id == action.payload.id) {
          console.log("Answer is already present");
          isPresent = true;
          return { ...item, selected: action.payload.selected };
        } else return item;
      });
      if (isPresent == true) return newState;
      return [...state, action.payload];
    case "CLEAR_ANSWER":
      return state.filter((answer) => answer.id != action.payload.id);
    default:
      return state;
  }
};

export default attemptReducer;

// answers: [
//   {
//     id: id,
//     selected: [],
//   },
// ];
