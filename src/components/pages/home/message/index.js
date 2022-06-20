import CatchErrorBoundary from '@common/catchErrorBoundary'
import { useState, Component } from 'react'
import './index.less'

const Message = () => {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    setCounter(counter + 1)
  }
  if (counter === 3) {
    throw new Error('I crashed!')
  }

  return (
    <div className="message">
      <h4>message</h4>
      <p onClick={handleClick}>点我加到3报错: {counter}</p>
      {/* <p>{yyy}</p> */}
    </div>
  )
}

// CatchErrorBoundary目前只在Class Component中实现了，没有在hooks中实现
class ErrorMessage extends Component {
  render() {
    return (
      <CatchErrorBoundary>
        <Message></Message>
      </CatchErrorBoundary>
    )
  }
}

export default ErrorMessage
