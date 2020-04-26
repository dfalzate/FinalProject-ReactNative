const ONEMAILCHANGELOGIN = 'ONEMAILCHANGELOGIN';
const ONPASSWORDCHANGELOGIN = 'ONPASSWORDCHANGELOGIN';

export function onEmailChange(text) {
  return function (dispatch) {
    dispatch({
      type: ONEMAILCHANGELOGIN,
      payload: text,
    });
  };
}
export function onPasswordChange(text) {
  return function (dispatch) {
    dispatch({
      type: ONPASSWORDCHANGELOGIN,
      payload: text,
    });
  };
}

let initialSate = {
  loginEmail: '',
  loginPassword: '',
};

export function loginReducer(state = initialSate, action) {
  switch (action.type) {
    case ONEMAILCHANGELOGIN:
      return {
        ...state,
        loginEmail: action.payload,
      };
    case ONPASSWORDCHANGELOGIN:
      return {
        ...state,
        loginPassword: action.payload,
      };
    default:
      return state;
  }
}
