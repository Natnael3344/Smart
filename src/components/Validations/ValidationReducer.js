// reducers/validationReducer.js
import { fileComplaintValidation } from "./Validation"; 
const initialState = {
    
};

const validationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VALIDATE_FORM':
      const { formState, validationRules } = action.payload;
      const errors = {};

      for (const fieldName in formState) {
        const value = formState[fieldName];
        const validationRule = validationRules[fieldName];

        if (!value.trim()) {
          errors[fieldName] = validationRule.isEmpty;
        } else if (!validationRule.validation.test(value)) {
          errors[fieldName] = validationRule.inValid;
        } 
        else {
          errors[fieldName] = validationRule.valid;
        }
      }

      return errors;

    default:
      return state;
  }
};

export default validationReducer;
