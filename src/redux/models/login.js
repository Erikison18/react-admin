import { combineReducers } from 'redux'
import { createActions, handleActions as createReducer } from 'redux-actions'

// createActions创建action
export const actiontor = createActions({
  // hooks组件写法，fetch写到hook方法中
  doLogin(data) {
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
const doLoginData = createReducer(
  {
    doLogin: (state, action) => action.payload,
  },
  {}
)

// 多个reducers需要combineReducers，组件取值时用...展开
export default combineReducers({ doLoginData })
