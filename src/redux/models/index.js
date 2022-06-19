import { combineReducers } from 'redux'
import count from './count'
import personList from './personList'
import login from './login'

export default combineReducers({ count, personList, login })
