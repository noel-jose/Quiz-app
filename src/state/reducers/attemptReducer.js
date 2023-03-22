import { SAVE_ANSWER, CLEAR_ANSWER } from "../../utils/constant";

const attemptReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_ANSWER:
      let isPresent = false;
      const newState = state.map((item) => {
        if (item.id == action.payload.id) {
          isPresent = true;
          return { ...item, selected: action.payload.selected };
        } else return item;
      });
      if (isPresent == true) return newState;
      return [...state, action.payload];
    case CLEAR_ANSWER:
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
