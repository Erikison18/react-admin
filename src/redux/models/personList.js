// 创建action
export const actiontor = {
  addPerson: (data) => ({ type: 'addPerson', data }),
}

// 创建reducer
const initState = [{ id: 111, name: 'tom' }]

const personList = (preState = initState, action) => {
  console.log(preState, action)
  const { type, data } = action
  switch (type) {
    case 'addPerson':
      return [data, ...preState]
    default:
      return preState
  }
}

export default personList
