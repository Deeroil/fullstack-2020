import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const StatisticLine = ({title, value}) => {
  return (
  <tr>
    <td>{title}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  //if total is NaN
  if (!total) {
    return (
      <>
      <div>No feedback given</div>
      </>
    )
  }

  return(
    <> 
    <table>
    <StatisticLine title="good" value={good} />
    <StatisticLine title="neutral" value={neutral} />
    <StatisticLine title="bad" value={bad} />
    <StatisticLine title="total" value={total} />
    <StatisticLine title="average" value={average} />
    <StatisticLine title="positive %" value={positive} />
    </table>
    </>
    )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const [good, goodState] = useState(0)  
  const [neutral, neutralState] = useState(0)
  const [bad, badState] = useState(0)

  const total = good + neutral + bad
  const average = (bad*-1 + good*1 + neutral*0)/total
  const positive = good / total

  return (
    <>
    <h2>give feedback</h2>
    <Button onClick={() => goodState(good + 1)} text="good" />
    <Button onClick={() => neutralState(neutral + 1)} text="neutral" />
    <Button onClick={() => badState(bad + 1)} text="bad" />
    <h2>statistics</h2>
    <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </> 
 )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
