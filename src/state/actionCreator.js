export const saveAnswer = (id, answer) => {
  return {
    type: "SAVE_ANSWER",
    payload: {
      id: id,
      selected: answer,
    },
  };
};

export const clearAnswer = (id) => {
  return {
    type: "CLEAR_ANSWER",
    payload: {
      id: id,
    },
  };
};
