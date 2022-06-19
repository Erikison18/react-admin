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
    this.getWether = this.getWether.bind(this)
  }

  addPerson() {
    this.props.addPerson({ id: new Date().valueOf(), name: this.name.value })
  }
  async addPersonServer() {
    this.setState({ loading: true })
    await this.props.addPersonServer({ id: this.name.value })
    this.setState({ loading: false })
  }
  async getWether() {
    console.log(this)
    this.setState({ loading: true })
    await this.props.getWether()
    this.setState({ loading: false })
    console.log(this)
  }

  render() {
    let { loading } = this.state
    let { personList, count, getWetherData } = this.props
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
          api随机添加
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
        <Button type="primary" onClick={this.getWether} loading={loading}>
          api获取wether
        </Button>
        <h6>天气：{getWetherData.ganmao}</h6>
      </div>
    )
  }
}

export default connect(
  ({ personList, count }) => ({
    ...personList,
    count,
  }),
  (dispatch) => bindActionCreators(actiontor, dispatch)
)(PersonList)
