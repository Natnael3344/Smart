import { SET_LANGUAGE } from "./languageActionTypes";


// action creators
export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});
