const GETCOMMENTS = 'GETCOMMENTS';
const ONCOMMENTCHANGE = 'ONCOMMENTCHANGE';

export function getComments(data) {
   return function (dispatch) {
      dispatch({
         type: GETCOMMENTS,
         payload: data,
      });
   };
}

export function onCommentChange(data) {
   return function (dispatch) {
      dispatch({
         type: ONCOMMENTCHANGE,
         payload: data,
      });
   };
}

let initialState = {
   comments: [],
   comment: '',
};

export function commentReducer(state = initialState, action) {
   switch (action.type) {
      case GETCOMMENTS:
         return {
            ...state,
            comments: action.payload,
         };
      case ONCOMMENTCHANGE:
         return {
            ...state,
            comment: action.payload,
         };
      default:
         return state;
   }
}
