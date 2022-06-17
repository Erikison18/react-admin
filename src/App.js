import 'fetch-default'
import { Provider } from 'react-redux'
import store from './redux/store'
import Router from './router'
import { message } from 'antd'
import './App.less'
// development环境引入antd.less，生产环境按需加载
process.env.NODE_ENV === 'development' &&
  (() => import('antd/dist/antd.less'))()

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
  beforeSend() {
    //排除serviceWorker项
    // console.log('beforeSend', this.uri)
    // if (!/^((ht|f)tps?):\/\/[\s\S]+\/[\s\S]+\.[\s\S]+$/.test(this.uri)) {
    //   this.uri = `${this.uri}`
    // }
  },
  async dataFilter(response) {
    // console.log('dataFilter', response)
    //排除serviceWorker请求文件项,热更新
    if (
      !/^((ht|f)tps?):\/\/[\s\S]+\/[\s\S]+\.[\s\S]+hot-update.json$/.test(
        response.url
      )
    ) {
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
    } else {
      return response
    }
  },
  fail(e) {
    message.error(e.toString())
    return { e }
  },
})

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router />
      </div>
    </Provider>
  )
}

export default App
