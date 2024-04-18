import { cmsConstants } from './CmsActions';


const intialState = {
  loading: false,
  cms: {},
}

export function cms(state = intialState, action) {
  switch (action.type) {
    case cmsConstants.CMS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
    case cmsConstants.CMS_SUCCESS:  
      return Object.assign({}, state, {
        loading: false,
        cms: action.data
      })
    case cmsConstants.CMS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        cms: action.data
      })
    case cmsConstants.CMS_UNLOAD:   
      return intialState
    default:
      return state
  }
}