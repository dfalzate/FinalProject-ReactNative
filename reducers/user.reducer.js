const ONUSERRECEIVED = 'ONUSERRECEIVED';
const ONPOSTSRECEIVED = 'ONPOSTSRECEIVED';
const ONFRIENDSRECEIVED = 'ONFRIENDSRECEIVED';
const ADDPOST = 'ADDPOST';

export function onUserReceived(data) {
   return function (dispatch) {
      dispatch({
         type: ONUSERRECEIVED,
         payload: data,
      });
   };
}
export function onPostsReceived(data) {
   return function (dispatch) {
      dispatch({
         type: ONPOSTSRECEIVED,
         payload: data,
      });
   };
}

export function onFriendsReceived(data) {
   return function (dispatch) {
      dispatch({
         type: ONFRIENDSRECEIVED,
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

const initialState = {
   id: '',
   name: '',
   lastName: '',
   posts: [],
   friends: [],
   token: {},
};

export function userReducer(state = initialState, action) {
   switch (action.type) {
      case ONUSERRECEIVED:
         return {
            ...state,
            id: action.payload.receivedUser._id,
            name: action.payload.receivedUser.name,
            lastName: action.payload.receivedUser.lastName,
            token: action.payload.token,
         };
      case ONPOSTSRECEIVED:
         return {
            ...state,
            posts: action.payload,
         };
      case ONFRIENDSRECEIVED:
         return {
            ...state,
            friends: action.payload,
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
