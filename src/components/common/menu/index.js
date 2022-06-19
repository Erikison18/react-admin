import { Menu } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './index.less'
const items = [
  {
    label: 'home',
    key: '/userLayout/home',
    children: [
      { label: 'message', key: '/userLayout/home/message' },
      { label: 'news', key: '/userLayout/home/news' },
    ],
  },
  { label: 'test', key: '/userLayout/test' },
  { label: 'about', key: '/userLayout/about' },
]

const MenuAntd = () => {
  const { doLoginData } = useSelector((state) => state.login)
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const [current, setCurrent] = useState(pathname)

  const onClick = (e) => {
    console.log('click ', e, doLoginData)
    setCurrent(e.key)
    navigate(e.key)
  }

  return (
    <div className="common-menu">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <span className="username">{doLoginData.name}</span>
    </div>
  )
}

export default MenuAntd
