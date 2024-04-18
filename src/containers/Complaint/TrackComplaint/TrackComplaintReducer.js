import { trackComplaintConstants } from './TrackComplaintActions';


const intialState = {
  loading: true,
  list: {},
}

export function complaintList(state = intialState, action) {
  switch (action.type) {
    case trackComplaintConstants.LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
    case trackComplaintConstants.LIST_SUCCESS:  
      return Object.assign({}, state, {
        loading: false,
        list: action.data
      })
    case trackComplaintConstants.LIST_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        list: action.data
      })
    case trackComplaintConstants.LIST_UNLOAD:   
      return intialState
    default:
      return state
  }
}