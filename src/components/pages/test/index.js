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
      msg: '',
    }
    this.getSearchList = this.getSearchList.bind(this)
    this.sendWS = this.sendWS.bind(this)
  }

  async componentDidMount() {
    await fetch(`/tenapi/comment`).then((res) => {
      this.setState({ word: res.data.song })
    })
    // console.log(this, 66)

    if ('WebSocket' in window) {
      console.log('您的浏览器支持 WebSocket!')
      // 打开一个 web socket
      this.ws = new WebSocket('ws://121.40.165.18:8800')
      this.ws.onopen = () => {
        console.log('已连接...')
      }
      this.ws.onmessage = (evt) => {
        let received_msg = evt.data
        console.log('数据已接收...', evt)
        this.setState({ msg: received_msg })
      }
      this.ws.onclose = () => {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
    } else {
      // 浏览器不支持 WebSocket
      alert('您的浏览器不支持 WebSocket!')
    }
  }

  sendWS() {
    // Web Socket 已连接上，使用 send() 方法发送数据
    this.ws.send('发送数据111')
    console.log('数据发送中...')
  }

  async getSearchList() {
    this.setState({ loading: true })
    await fetch(`/github/search/users?q=Erikson`).then((res) => {
      this.setState({ searchList: res.items })
    })
    this.setState({ loading: false })
  }

  render() {
    let { word, searchList, loading, msg } = this.state
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
        <hr></hr>
        <div>
          <h5>websocket</h5>
          <p>收到的内容： {msg}</p>
          <Button type="primary" onClick={this.sendWS}>
            send websocket
          </Button>
        </div>
      </div>
    )
  }
}

export default Test
