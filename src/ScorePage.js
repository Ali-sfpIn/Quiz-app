import { Button } from "./Button.js";

export function ScorePage({ initializer, points }) {
  return (
    <div className="scorePage">
      <h3>Congratulations</h3>
      <p>your score is {points}</p>
      <Button onClick={() => initializer()}>Again</Button>
    </div>
  );
}
