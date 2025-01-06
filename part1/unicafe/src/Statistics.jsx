import StatisticLine from './StatisticLine'

const Statistics = ({total, good, neutral, bad}) => {
  return (
    <div>
      <table>
        <tr>
          <td><StatisticLine text="good"/></td>
          <td><StatisticLine total={good}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="neutral"/></td>
          <td><StatisticLine total={neutral}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="bad"/></td>
          <td><StatisticLine total={bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine text="total"/></td>
          <td><StatisticLine total={total}/></td>
        </tr>
      </table>
    </div>
  )
}

export default Statistics
