import Statistics from "./Statistics"


const History = ({total, good, neutral, bad}) => {
    if(total === 0) {
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}
return (
    <Statistics total={total} good={good} neutral={neutral} bad={bad} />
)
}

export default History
