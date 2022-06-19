import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// 下面两个中间件必须用本地的，model里面才能用redux-actions写法
import thunk from './middleware/reduxThunkPayload'
import filterActionType from './middleware/filterActionType'
import promiseMiddleware from 'redux-promise-middleware'
import { promiseTypeSuffixes, promiseTypeDelimiter } from './config'
import reducers from './models'
import { persistStore, persistReducer } from 'redux-persist'
//导入需要配置的数据源，可以选择，storage，cookie，session等
import storage from 'redux-persist/lib/storage'

//定义配置的信息
const persitConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['login'],
}
//创建持久化的配置persist的信息
const persist_reducers = persistReducer(persitConfig, reducers)

const store = createStore(
  persist_reducers,
  applyMiddleware(
    thunk,
    promiseMiddleware({
      promiseTypeSuffixes,
      promiseTypeDelimiter,
    }),
    filterActionType()
  )
)
const persistor = persistStore(store) //使用persistStore包裹一下

export { store, persistor }
