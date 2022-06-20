import React from 'react'

export default class CatchErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.warn(error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 同样可以将错误日志上报给服务器
    // warnErrorToMyService(error, errorInfo)
    // console.warn(error.toString())
    console.warn(
      errorInfo.componentStack
        .replace(/[\n\r]/g, '<br/>')
        .replace(/\s/g, '&nbsp;')
    )
    // alert('应用出现错误')
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
