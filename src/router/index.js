import React from 'react'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import NotFound from '@pages/notFound'
import { routerList } from './routerList'

const renderRouter = (routerList) => {
  return routerList.map((item) => {
    const { path, children } = item
    // console.log(path, children)
    // const token = localStorage.getItem('token')
    // console.log(noAuth, token)
    // if (!noAuth && !token)
    //   return (
    //     <Route key={'/login'} path="*" element={<Navigate to="/login" />} />
    //   )
    return (
      <Route key={path} path={path} element={<item.component />}>
        {!!children && renderRouter(children)}
      </Route>
    )
  })
}

// console.log(renderRouter(routerList))

const Routers = () => {
  //   console.log(props)
  return (
    <HashRouter>
      <React.Suspense
        fallback={<Spin spinning={true} tip="正在加载中......" />}
      >
        <Routes>
          <Route key="/" path="/" element={<Navigate to="/login" />} />
          {renderRouter(routerList)}
          <Route key={'/notFound'} path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </HashRouter>
  )
}

export default React.memo(Routers)
