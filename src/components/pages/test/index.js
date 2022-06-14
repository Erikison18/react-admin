import { Component } from 'react'
import { Button } from 'antd'
import './index.less'

class Test extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      searchList: [],
      word: '',
    }
    this.getSearchList = this.getSearchList.bind(this)
  }

  async componentDidMount() {
    await fetch(`/comment`).then((res) => {
      this.setState({ word: res.data.song })
    })
    console.log(this, 66)
  }

  async getSearchList() {
    this.setState({ loading: true })
    await fetch(`/github/search/users?q=Erikson`).then((res) => {
      this.setState({ searchList: res.items })
    })
    this.setState({ loading: false })
  }

  render() {
    let { word, searchList, loading } = this.state
    return (
      <div className="test">
        <h4 className="testCss">{word}</h4>
        <div className={`test-index2`}>
          <Button type="primary" onClick={this.getSearchList} loading={loading}>
            fetch github
          </Button>
          <ul>
            {searchList.slice(0, 5).map((item) => {
              return (
                <li key={item.id}>
                  {item.login}--{item.url}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Test
