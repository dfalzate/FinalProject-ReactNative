const GETPOST = 'GETPOST';
const GETCOMMENTS = 'GETCOMMENTS';

export function getPost(data) {
   return function (dispatch) {
      dispatch({
         type: GETPOST,
         payload: data,
      });
   };
}

export function getComments(data) {
   return function (dispatch) {
      dispatch({
         type: GETCOMMENTS,
         payload: data,
      });
   };
}

const initialState = {
   post: {},
   comments: {},
};

export function postReducer(state = initialState, action) {
   switch (action.type) {
      case GETPOST:
         return {
            ...state,
            post: action.payload,
         };
      case GETCOMMENTS:
         return {
            ...state,
            comments: action.payload,
         };
      default:
         return state;
   }
}
