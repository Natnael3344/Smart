import { fileComplaintConstants } from './FileComplaint.actions';

const intialState = {
  loading: false,
  user: {},
}

const pincodeIntialState = {
  loading: false,
  data: {},
}

export function fileComplaint(state = intialState, action) {
  switch (action.type) {
    case fileComplaintConstants.FILECOMPLAINT_REQUEST:
      return Object.assign({}, state, {
        loading: true
      })
    case fileComplaintConstants.FILECOMPLAINT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
    case fileComplaintConstants.FILECOMPLAINT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: action.data
      })
      case fileComplaintConstants.FILECOMPLAINT_RESET_REQUEST:
        return Object.assign({}, state, intialState)
    default:
      return state
  }
}


export function pincode(state = pincodeIntialState, action) {
  switch (action.type) {
   
      case fileComplaintConstants.PINCODE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
    case fileComplaintConstants.PINCODE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.data
      })
    case fileComplaintConstants.PINCODE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        data: action.data
      })
    default:
      return state
  }
}
