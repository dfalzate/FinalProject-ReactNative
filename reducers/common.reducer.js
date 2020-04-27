const ISLOGGED = 'ISLOGGED';
const LOCATIONPERMISSION = 'LOCATIONPERMISSION';
const GETPOSTS = 'GETPOSTS';
const ADDPOST = 'ADDPOST';

export function isLogged(data) {
  return function (dispatch) {
    dispatch({
      type: ISLOGGED,
      payload: {
        isLogged: true,
        token: data.token,
        userId: data.userId,
      },
    });
  };
}

export function locationPermission() {
  return function (dispatch) {
    dispatch({
      type: LOCATIONPERMISSION,
      payload: true,
    });
  };
}

export function getPosts(data) {
  return function (dispatch) {
    dispatch({
      type: GETPOSTS,
      payload: data,
    });
  };
}

export function addPost(data) {
  return function (dispatch) {
    dispatch({
      type: ADDPOST,
      payload: data,
    });
  };
}

let initialState = {
  userId: '',
  isLogged: false,
  token: {},
  locationPermission: false,
  posts: [],
};

export function commonReducer(state = initialState, action) {
  switch (action.type) {
    case ISLOGGED:
      return {
        ...state,
        isLogged: action.payload.isLogged,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOCATIONPERMISSION:
      return {
        ...state,
        locationPermission: action.payload,
      };
    case GETPOSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADDPOST:
      return {
        ...state,
        posts: state.posts.concat([action.payload]),
      };
    default:
      return state;
  }
}
