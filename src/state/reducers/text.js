{
  quizzes: [
    {
      id: 1,
      title: "QUIZ 1",
      desc: "description of quiz 1",
      questions: [
        {
          id: 1,
          question: "Who is the first prime minister of india",
          type: "MULTISELECT",
          options: [
            { option: "Javaharlal Nehru", isCorrect: true },
            { option: "Indira Gandhi", isCorrect: false },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "QUIZ 2",
      desc: "description of quiz 2",
      questions: [
        {
          id: 1,
          question: "What is the national language of india",
          type: "SINGLE SELECT",
          options: [
            { option: "HINDI", isCorrect: true },
            { option: "ENGLISH", isCorrect: false },
            { option: "MALAYALAM", isCorrect: false },
          ],
        },
        {
          id: 2,
          question: "Which of the following are south indian states",
          type: "MULTISELECT",
          options: [
            {
              option: "ODISHA",
              isCorrect: false,
            },
            {
              option: "Kerala",
              isCorrect: true,
            },
            {
              option: "GOA",
              isCorrect: true,
            },
          ],
        },
      ],
    },
  ];
}
