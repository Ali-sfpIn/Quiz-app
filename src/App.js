import { useState, useEffect } from "react";
import questions from "./data.js";
import { ScorePage } from "./ScorePage.js";
import { Button } from "./Button.js";
import { QuestionsList } from "./QuestionsList.js";

export default function App() {
  const [curQuestion, setCurQuestion] = useState(questions[0]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPoints, setShowPoints] = useState(false);

  const [points, setPoints] = useState(0);

  const answer = curQuestion.answer;
  useEffect(() => {
    if (selectedOption === answer) {
      setPoints((prevPoints) => prevPoints + 1);
    }
  }, [selectedOption, answer]);

  function handleQuestion() {
    const index = questions.indexOf(curQuestion);
    if (index === 9) return setShowPoints(true);
    setCurQuestion(questions[index + 1]);
    setSelectedOption("");
  }

  function initializer() {
    setCurQuestion(questions[0]);
    setSelectedOption("");
    setPoints(0);
    setShowPoints(false);
  }

  return (
    <div className="box">
      {!showPoints && (
        <>
          <p value={curQuestion.id} className="question">
            {curQuestion.question}
          </p>
          <QuestionsList
            curQuestion={curQuestion}
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
            answer={answer}
          />
          {selectedOption && <Button onClick={handleQuestion}>Next</Button>}
        </>
      )}

      {showPoints && <ScorePage points={points} initializer={initializer} />}
    </div>
  );
}
