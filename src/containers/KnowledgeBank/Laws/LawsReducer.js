
import {
  FETCH_CARDS_REQUEST,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
} from './LawsActions';

const initialState = {
  law: [],
  loading: false,
  error: null,
};

const LawsReducer = (state = initialState, action) => {
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
        law: action.payload,
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

export default LawsReducer;