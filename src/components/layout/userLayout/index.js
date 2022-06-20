import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import MenuAntd from '@common/menu'
import './index.less'

const UserLayout = () => {
  const navigate = useNavigate()
  const { loginFlag } = useSelector((state) => state.login)
  console.log(loginFlag)
  useEffect(() => {
    // console.log(loginFlag)
    // 未登陆判断
    if (!loginFlag) {
      navigate('/login')
    }
  })

  return (
    <React.Fragment>
      <MenuAntd></MenuAntd>
      <Outlet></Outlet>
    </React.Fragment>
  )
}

export default UserLayout
