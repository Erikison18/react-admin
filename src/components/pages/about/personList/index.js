import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actiontor } from '@models/personList'
import { Button } from 'antd'

class PersonList extends Component {
  constructor() {
    super()

    this.state = { loading: false }
    this.addPerson = this.addPerson.bind(this)
    this.addPersonServer = this.addPersonServer.bind(this)
  }

  addPerson() {
    this.props.addPerson({ id: new Date().valueOf(), name: this.name.value })
  }
  addPersonServer() {}

  render() {
    let { loading } = this.state
    let { personList, count } = this.props
    return (
      <div className="personList">
        <h1>list组件--人员列表</h1>
        <h4>上方count组件求和为： {count}</h4>
        <input
          type="text"
          placeholder="请输入名字"
          ref={(dom) => (this.name = dom)}
        />
        <Button type="primary" onClick={this.addPerson}>
          添加
        </Button>
        <Button type="primary" onClick={this.addPersonServer} loading={loading}>
          随机添加
        </Button>
        <ul>
          {personList.map((item) => {
            return (
              <li key={item.id}>
                {item.id}---{item.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(
  ({ personList, count }) => ({ personList, count }),
  (dispatch) => bindActionCreators(actiontor, dispatch)
)(PersonList)
