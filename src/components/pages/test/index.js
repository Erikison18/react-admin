import { Button } from 'antd'
import './index.less'

function Test() {
  console.log(2345)

  return (
    <div className="test">
      <h4 className="testCss">testCss</h4>
      <Button type="primary">Button</Button>
    </div>
  )
}

export default Test
