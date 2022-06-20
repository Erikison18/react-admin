import { combineReducers } from 'redux'
import { createActions, handleActions as createReducer } from 'redux-actions'

// createActions创建action， 注意action type不要和其他模块命名冲突
export const actiontor = createActions({
  // hooks组件写法，fetch写到hook方法中
  setLoginFlag(data) {
    return data
  },
  setUserInfo(data) {
    return data
  },
  // class组件写法，fetch写到action方法中
  // doLogin(params) {
  //   return async () => {
  //     let { code, data } = await fetch(
  //       `/tenapi/bilibili/?uid=${params.username}`
  //     )
  //     if (code === 200) {
  //       return data
  //     } else {
  //       return {}
  //     }
  //   }
  // },
})

// createReducer创建reducer
const loginFlag = createReducer(
  {
    setLoginFlag: (state, action) => action.payload,
  },
  false
)
const userInfo = createReducer(
  {
    setUserInfo: (state, action) => action.payload,
  },
  {}
)

// 多个reducers需要combineReducers，组件取值时用...展开
export default combineReducers({ userInfo, loginFlag })
