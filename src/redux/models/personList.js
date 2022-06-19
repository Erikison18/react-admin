import { combineReducers } from 'redux'
import { createActions, handleActions as createReducer } from 'redux-actions'

// 原始方式创建action
// export const actiontor = {
//   addPerson: (data) => ({ type: 'addPerson', data }),
//   addPersonServer: (params) => {
//     return async (dispatch) => {
//       let { code, data } = await fetch(`/tenapi/bilibili/?uid=${params.id}`)
//       if (code === 200) {
//         dispatch({ type: 'addPerson', data: { name: data.name, id: data.uid } })
//       } else {
//         dispatch({
//           type: 'addPerson',
//           data: { name: 'test', id: new Date().valueOf() + '-' + params.id },
//         })
//       }
//     }
//   },
// }
// createActions创建action
export const actiontor = createActions({
  addPerson(data) {
    return data
  },
  addPersonServer(params) {
    return async (dispatch) => {
      let { code, data } = await fetch(`/tenapi/bilibili/?uid=${params.id}`)
      if (code === 200) {
        dispatch(actiontor.addPerson({ name: data.name, id: data.uid }))
      } else {
        dispatch(
          actiontor.addPerson({
            name: 'test',
            id: new Date().valueOf() + '-' + params.id,
          })
        )
      }
    }
  },
  getWether() {
    return async () => {
      let { status: code, data } = await fetch(`/tenapi/wether/?city=北京`)
      if (code === 1000) {
        return data
      } else {
        return { ganmao: '12' }
      }
    }
  },
})

// 原始方式创建reducer
// const initState = [{ id: 111, name: 'tom' }]
// const personList = (preState = initState, action) => {
//   console.log(preState, action)
//   const { type, data } = action
//   switch (type) {
//     case 'addPerson':
//       return [data, ...preState]
//     default:
//       return preState
//   }
// }
// createReducer创建reducer
const personList = createReducer(
  {
    addPerson: (state, action) => {
      console.error(state, action)
      return [action.payload, ...state]
    },
  },
  [{ id: 111, name: 'tom' }]
)
const getWetherData = createReducer(
  {
    getWether: (state, action) => {
      console.error(state, action)
      return action.payload
    },
  },
  {}
)

// 多个reducers需要combineReducers，组件取值时用...展开
export default combineReducers({ personList, getWetherData })
