import React from 'react'
const Login = React.lazy(() => import('@pages/login'))
const UserLayout = React.lazy(() => import('@layout/userLayout'))
const Home = React.lazy(() => import('@pages/home'))
const Message = React.lazy(() => import('@pages/home/message'))
// const News = React.lazy(() => import('@pages/home/news')) // 组件lazy加载，第一次进入组件，页面会闪烁
// const Detail = React.lazy(() => import('@pages/home/news/detail'))
import News from '@pages/home/news'
import Detail from '@pages/home/news/detail'
const Test = React.lazy(() => import('@pages/test'))
const About = React.lazy(() => import('@pages/about'))

export const routerList = [
  {
    path: '/login',
    component: Login,
    noAuth: true,
  },
  {
    path: '/userLayout',
    component: UserLayout,
    children: [
      {
        path: 'home',
        component: Home,
        children: [
          {
            path: 'message',
            component: Message,
          },
          {
            path: 'news',
            component: News,
            children: [
              {
                path: 'detail',
                component: Detail,
              },
            ],
          },
        ],
      },
      {
        path: 'test',
        component: Test,
      },
      {
        path: 'about',
        component: About,
      },
    ],
  },
]
