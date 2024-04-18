export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const fetchCardsRequest = () => ({
  type: FETCH_CARDS_REQUEST,
});

export const fetchCardsSuccess = (blog) => ({
  type: FETCH_CARDS_SUCCESS,
  payload: blog,
});

export const fetchCardsFailure = (error) => ({
  type: FETCH_CARDS_FAILURE,
  payload: error,
});