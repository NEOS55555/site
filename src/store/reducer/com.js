import { SET_USER_NAME, UPDATE_COM_DATA } from '../actions';
import cookie from 'react-cookies'
const initState = {
  // ip: '',
  is_async: false,
  user_name: cookie.load('user_name'),
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case UPDATE_COM_DATA:
      return {
        ...state,
        ...data
      }
    case SET_USER_NAME: 
      return {
        ...state,
        user_name: data
      }
    default:
      return state
  }
};
