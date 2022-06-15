import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import MenuAntd from '@common/menu'
import './index.less'

class UserLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <MenuAntd></MenuAntd>
        <Outlet></Outlet>
      </React.Fragment>
    )
  }
}

export default UserLayout
