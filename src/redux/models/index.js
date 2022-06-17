import { combineReducers } from 'redux'
import count from './count'
import personList from './personList'

export default combineReducers({ count, personList })
