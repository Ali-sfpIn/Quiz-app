export function QuestionsList({
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
