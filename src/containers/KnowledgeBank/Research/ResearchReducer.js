
import {
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
} from './ResearchActions';

const initialState = {
  research: [],
  loading: false,
  error: null,
};

const ResearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        research: action.payload,
      };
    case FETCH_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ResearchReducer;