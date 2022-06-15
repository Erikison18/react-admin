import 'fetch-default'
import Router from './router'
import { message } from 'antd'
import './App.less'

// fetch 默认配置
fetch.default({
  method: 'GET',
  headers: {
    // credentials: 'include',
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // mode: 'cors',
    // cache: 'force-cache',
  },
  beforeSend() {},
  async dataFilter(response) {
    // console.log('dataFilter', response)
    if (response.ok === false) {
      message.error(`${response.status}\n${response.statusText}`)
      return {}
    }

    let data = await response.json()
    // let { code, message: messageDes } = data
    //未登录
    // if(code === 5000){
    //     message.error(messageDes);
    //     store.dispatch(actiontor.loginLogOut());
    // }
    // 错误状态
    // if (code !== 200) {
    //   message.error(messageDes)
    // }

    return data
  },
  fail(e) {
    message.error(e.toString())
    return { e }
  },
})

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
