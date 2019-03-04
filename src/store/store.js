import {createStore,combineReducers} from 'redux'
import '../global.js'

const UPDATE_USERNAME = 'UPDATE_USERNAME'
const DELETE_USERNAME = 'DELETE_USERNAME'


function modifyUsername(state = {username: global.getCookie()},action){
  switch(action.type){
    case UPDATE_USERNAME:
      return Object.assign({}, state, {
        username: action.username
      })
    case DELETE_USERNAME:
      return Object.assign({}, state, {
        username: null
      })
    default:
      return state
  }
}
export var store = createStore(combineReducers({name: modifyUsername}))

