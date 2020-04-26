const ONNAMECHANGE = 'ONNAMECHANGE';
const ONLASTNAMECHANGE = 'ONLASTNAMECHANGE';
const ONEMAILCHANGESIGNUP = 'ONEMAILCHANGESIGNUP';
const ONPASSWORDCHANGESIGNUP = 'ONPASSWORDCHANGESIGNUP';

export function onNameChange(data) {
  return function (dispatch) {
    dispatch({
      type: ONNAMECHANGE,
      payload: data,
    });
  };
}

export function onLastNameChange(data) {
  return function (dispatch) {
    dispatch({
      type: ONLASTNAMECHANGE,
      payload: data,
    });
  };
}

export function onEmailChangeSignup(data) {
  return function (dispatch) {
    dispatch({
      type: ONEMAILCHANGESIGNUP,
      payload: data,
    });
  };
}

export function onPasswordChangeSignup(data) {
  return function (dispatch) {
    dispatch({
      type: ONPASSWORDCHANGESIGNUP,
      payload: data,
    });
  };
}

let initialState = {
  signupName: '',
  signupLastName: '',
  signupEmail: '',
  signupPassword: '',
};

export function signupReducer(state = initialState, action) {
  switch (action.type) {
    case ONNAMECHANGE:
      return {
        ...state,
        signupName: action.payload,
      };
    case ONLASTNAMECHANGE:
      return {
        ...state,
        signupLastName: action.payload,
      };
    case ONEMAILCHANGESIGNUP:
      return {
        ...state,
        signupEmail: action.payload,
      };
    case ONPASSWORDCHANGESIGNUP:
      return {
        ...state,
        signupPassword: action.payload,
      };

    default:
      return state;
  }
}
