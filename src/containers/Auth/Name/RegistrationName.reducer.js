import { registrationNameConstants } from './RegistrationName.actions';

const intialState = {
  loading: false,
  user: {},
}

export function registrationName(state = intialState, action) {
  switch (action.type) {
    case registrationNameConstants.REGISTRATION_NAME_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
    case registrationNameConstants.REGISTRATION_NAME_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
    case registrationNameConstants.REGISTRATION_NAME_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
    case registrationNameConstants.USER_LOGOUT:   
      return intialState;   
    default:
      return state
  }
}