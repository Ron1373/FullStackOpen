import { useState } from "react";
const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ goodCount, badCount, neutralCount }) => {
  const goodScore = 1;
  const badScore = -1;
  const neutralScore = 0;
  const totalCount = goodCount + badCount + neutralCount;
  const average =
    (goodCount * goodScore +
      badCount * badScore +
      neutralCount * neutralScore) /
    totalCount;
  const positivePercentage = (goodCount / totalCount) * 100 + "%";

  if (goodCount === 0 && badCount === 0 && neutralCount === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h1>statistics</h1>
          </th>
        </tr>
      </thead>

      <tbody>
        <StatisticLine text="good" value={goodCount} />
        <StatisticLine text="neutral" value={neutralCount} />
        <StatisticLine text="bad" value={badCount} />
        <StatisticLine text="all" value={totalCount} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positivePercentage} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics goodCount={good} badCount={bad} neutralCount={neutral} />
    </div>
  );
};

export default App;
