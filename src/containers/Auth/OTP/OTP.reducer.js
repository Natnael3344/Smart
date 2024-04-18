import { OTPConstants } from './OTP.actions';

const intialState = {
  loading: false,
  loadingSignOut : false,
  user: {},
}

export function otp(state = intialState, action) {  
  switch (action.type) {
    case OTPConstants.OTP_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        user:{}
      })
    case OTPConstants.OTP_SUCCESS:   
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
    case OTPConstants.OTP_UPDATE:   
      
      state.user.data["result"] = action.data.result
      return state;

    case OTPConstants.OTP_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
    case OTPConstants.OTP_RESEND:  
      return Object.assign({}, state, {
        loading: false
      })
	case OTPConstants.LOGOUT_REQUEST:
        return Object.assign({}, state, {
          loadingSignOut: true
        })
        
    case OTPConstants.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loadingSignOut : true,
        user: {},
      })
    default:
      return state
  }
}