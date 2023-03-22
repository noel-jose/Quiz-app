import { SAVE_ANSWER, CLEAR_ANSWER } from "../utils/constant";
export const saveAnswer = (id, answer) => {
  return {
    type: SAVE_ANSWER,
    payload: {
      id: id,
      selected: answer,
    },
  };
};

export const clearAnswer = (id) => {
  return {
    type: CLEAR_ANSWER,
    payload: {
      id: id,
    },
  };
};
