import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user,Validated: false,Validating:false } : { loggedIn: false,Validated: false,Validating:false };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,

      };
    case userConstants.LOGIN_FAILURE:
      return { loggedIn: false };

    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false
      };

    case userConstants.SIGNUP_REQUEST:
      return {
        ...state,
        loggingIn : false,
        Validating : true,
        Validated : false

      }

      case userConstants.SIGNUP_SUCCESS:
        return {
          ...state,
          Validating : false,
          Validated : true
  
        }


        case userConstants.SIGNUP_FAILURE:
          return {
            ...state,
            Validating : false,
            Validated : false
    
          }
    default:
      return state
  }
}