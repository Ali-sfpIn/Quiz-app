import { useState, useEffect } from "react";
import questions from "./data.js";

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

function QuestionsList({
  curQuestion,
  selectedOption,
  onSelectOption,
  answer,
}) {
  return (
    <ul>
      {curQuestion.options.map((option) => (
        <li
          onClick={() => onSelectOption(option.id)}
          key={option.id}
          className={`option ${
            selectedOption
              ? answer === option.id
                ? "correct"
                : "incorrect"
              : ""
          } ${option.id === selectedOption ? "selected" : ""}
          ${selectedOption && "disabled"}
            `}
        >
          {option.text}
        </li>
      ))}
    </ul>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

function ScorePage({ initializer, points }) {
  return (
    <div className="scorePage">
      <h3>Congratulations</h3>
      <p>your score is {points}</p>
      <Button onClick={() => initializer()}>Again</Button>
    </div>
  );
}
