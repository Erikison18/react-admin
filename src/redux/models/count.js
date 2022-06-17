// 创建action
export const actiontor = {
  increment: (data) => ({ type: 'increment', data }),
  decrement: (data) => ({ type: 'decrement', data }),
  incrementAsync: (data, time) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'increment', data })
      }, time)
    }
  },
}

// 创建reducer
const initState = 10

const count = (preState = initState, action) => {
  console.log(preState, action)
  const { type, data } = action
  switch (type) {
    case 'increment':
      return (preState += data)
    case 'decrement':
      return (preState -= data)
    default:
      return preState
  }
}

export default count
