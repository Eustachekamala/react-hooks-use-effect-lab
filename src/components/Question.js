import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the interval to count down every second
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval); // Clear the interval when time is up
          onAnswered(false); // Call onAnswered with false when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer
    onAnswered(isCorrect); // Call the callback with the result of the answer
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
