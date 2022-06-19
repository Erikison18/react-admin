import { createActions, handleActions as createReducer } from 'redux-actions'

// // 原始方式创建action
// export const actiontor = {
//   increment: (data) => ({ type: 'increment', data }),
//   decrement: (data) => ({ type: 'decrement', data }),
//   incrementAsync: (data, time) => {
//     return (dispatch) => {
//       setTimeout(() => {
//         dispatch({ type: 'increment', data })
//       }, time)
//     }
//   },
// }
// createActions创建action
export const actiontor = createActions({
  increment(data) {
    return data
  },
  decrement(data) {
    return data
  },
  incrementAsync(data, time) {
    return async (dispatch) => {
      await setTimeout(() => {
        dispatch(actiontor.increment(data))
      }, time)
    }
  },
})

// // 原始方式创建reducer
// const initState = 10
// const count = (preState = initState, action) => {
//   console.log(preState, action)
//   const { type, data } = action
//   switch (type) {
//     case 'increment':
//       return (preState += data)
//     case 'decrement':
//       return (preState -= data)
//     default:
//       return preState
//   }
// }
// createReducer创建reducer
const count = createReducer(
  {
    increment: (state, action) => {
      console.error(state, action)
      return state + action.payload
    },
    decrement: (state, action) => {
      console.error(state, action)
      return state - action.payload
    },
  },
  10
)

export default count
