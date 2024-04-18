import { registrationConstants } from './Registration.actions';

const intialState = {
  loading: false,
  user: {},
}

export function registration(state = intialState, action) {
  switch (action.type) {
    case registrationConstants.REGISTRATION_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
    case registrationConstants.REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
    case registrationConstants.REGISTRATION_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
    case registrationConstants.USER_LOGOUT:   
      return intialState;   
    default:
      return state
  }
}