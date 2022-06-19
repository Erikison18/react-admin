import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// 下面两个中间件必须用本地的，model里面才能用redux-actions写法
import thunk from './middleware/reduxThunkPayload'
import filterActionType from './middleware/filterActionType'
import promiseMiddleware from 'redux-promise-middleware'
import { promiseTypeSuffixes, promiseTypeDelimiter } from './config'
import reducers from './models'

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    promiseMiddleware({
      promiseTypeSuffixes,
      promiseTypeDelimiter,
    }),
    filterActionType()
  )
)

export default store
