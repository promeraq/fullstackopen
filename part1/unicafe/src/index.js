import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Statistics = ({ feedBack }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Statistics</th>
          </tr>
        </thead>
        <tbody>
          {feedBack.all === 0 ? (
            <tr>
              <td>No feedback given</td>
            </tr>
          ) : (
            <>
              <StatisticLine text="good" value={feedBack.good} />
              <StatisticLine text="neutral" value={feedBack.neutral} />
              <StatisticLine text="bad" value={feedBack.bad} />
              <StatisticLine text="all" value={feedBack.all} />
              <StatisticLine text="average" value={feedBack.average} />
              <StatisticLine
                text="positive"
                value={`${feedBack.positive * 100}%`}
              />
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  /*   const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0); */
  const [feedBack, setFeedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const setGoodFeedback = () => {
    setFeedBack({
      ...feedBack,
      good: feedBack.good + 1,
      all: feedBack.all + 1,
      average:
        (feedBack.good * 1 + feedBack.neutral * 0 + feedBack.bad * -1) /
        feedBack.all,
      positive: feedBack.good / feedBack.all,
    });
  };

  const setNeutralFeedback = () => {
    setFeedBack({
      ...feedBack,
      neutral: feedBack.neutral + 1,
      all: feedBack.all + 1,
      average:
        (feedBack.good * 1 + feedBack.neutral * 0 + feedBack.bad * -1) /
        feedBack.all,
      positive: feedBack.good / feedBack.all,
    });
  };

  const setBadFeedback = () => {
    setFeedBack({
      ...feedBack,
      bad: feedBack.bad + 1,
      all: feedBack.all + 1,
      average:
        (feedBack.good * 1 + feedBack.neutral * 0 + feedBack.bad * -1) /
        feedBack.all,
      positive: feedBack.good / feedBack.all,
    });
  };

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={setGoodFeedback} text="good" />
      <Button onClick={setNeutralFeedback} text="neutral" />
      <Button onClick={setBadFeedback} text="bad" />

      <Statistics feedBack={feedBack} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
