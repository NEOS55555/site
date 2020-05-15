import { SET_USER_NAME } from '../actions';
import cookie from 'react-cookies'
const initState = {
  // ip: '',
  user_name: cookie.load('user_name'),
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case SET_USER_NAME: 
      return {
        ...state,
        user_name: data
      }
    default:
      return state
  }
};
