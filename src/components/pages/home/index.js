import { Component } from 'react'
import { Outlet } from 'react-router-dom'
import './index.less'

class Home extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div className="home">
        <h1>home</h1>
        <Outlet></Outlet>
      </div>
    )
  }
}

export default Home
