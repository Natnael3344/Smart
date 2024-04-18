// actions/validationActions.js

export const validateForm = (formState, validationRules) => {
    return {
      type: 'VALIDATE_FORM',
      payload: {
        formState,
        validationRules,
      },
    };
  };
  