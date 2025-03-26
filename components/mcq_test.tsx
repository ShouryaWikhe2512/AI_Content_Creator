import React, { useState } from "react";

const questions = [
  {
    characteristic: "creativity",
    question:
      "What technique can help content creators overcome creative blocks?",
    options: [
      "Using templates",
      "Brainstorming",
      "Mind mapping",
      "Waiting for inspiration",
    ],
    correct_answer: "Brainstorming",
  },
  {
    characteristic: "creativity",
    question:
      "How can visual elements enhance the creativity of written content?",
    options: [
      "Adding relevant images",
      "Using infographics",
      "Making content interactive",
      "Adding videos",
    ],
    correct_answer: "Using infographics",
  },
  // Add more questions here...
];

export default function MCQ() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg text-black">
      {!quizFinished ? (
        <>
          <h2 className="text-lg font-bold">
            {questions[currentQuestion].question}
          </h2>
          <div className="mt-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`block w-full p-2 my-2 text-left rounded-md border transition-all duration-300
                  ${
                    showAnswer
                      ? option === questions[currentQuestion].correct_answer
                        ? "bg-green-400"
                        : "bg-red-400"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                disabled={showAnswer}
              >
                {option}
              </button>
            ))}
          </div>
          {showAnswer && (
            <button
              onClick={handleNext}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </button>
          )}
        </>
      ) : (
        <h2 className="text-lg font-bold text-center">🎉 Quiz Completed! 🎉</h2>
      )}
    </div>
  );
}
