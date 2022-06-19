import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actiontor } from '@models/count'
import { Button, Select } from 'antd'

const { Option } = Select

class Count extends Component {
  constructor() {
    super()

    this.state = {
      number: 1,
    }
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.incrementOdd = this.incrementOdd.bind(this)
    this.incrementWait = this.incrementWait.bind(this)
  }

  componentDidMount() {
    console.log(this)
  }

  handleChange(value) {
    this.setState({ number: value })
  }
  increment() {
    this.props.increment(this.state.number * 1)
  }
  decrement() {
    this.props.decrement(this.state.number * 1)
  }
  incrementOdd() {
    if (this.props.count % 2 === 1) {
      this.props.increment(this.state.number * 1)
    }
  }
  incrementWait() {
    this.props.incrementAsync(this.state.number * 1, 1000)
  }

  render() {
    let { number } = this.state
    let { count, personList } = this.props
    return (
      <div className="count">
        <h5>但前求和为： {count}</h5>
        <h5>下方personList组件人数： {personList.length}</h5>
        <Select
          defaultValue={number}
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
        <br></br>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementOdd}>求和为奇数在加</Button>
        <Button onClick={this.incrementWait}>等待1s后加</Button>
      </div>
    )
  }
}

export default connect(
  ({ count, personList }) => ({ count, ...personList }),
  (dispatch) => bindActionCreators(actiontor, dispatch)
)(Count)
