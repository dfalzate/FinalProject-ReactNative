const GETINITIALLOCATION = 'GETINITIALLOCATION';
const GETINITIALTIME = 'GETINITIALTIME';
const GETFINALTIME = 'GETFINALTIME';
const GETROUTE = 'GETROUTE';
const GETLEVEL = 'GETLEVEL';
const GETSPEED = 'GETSPEED';
const ONTITLECHANGE = 'ONTITLECHANGE';

export function getInitialLocation(data) {
   return function (dispatch) {
      dispatch({
         type: GETINITIALLOCATION,
         payload: data,
      });
   };
}

export function getInitialTime() {
   return function (dispatch) {
      dispatch({
         type: GETINITIALTIME,
         payload: Date(),
      });
   };
}

export function getFinalTime() {
   return function (dispatch) {
      dispatch({
         type: GETFINALTIME,
         payload: Date(),
      });
   };
}

export function getRoute(data) {
   return function (dispatch) {
      dispatch({
         type: GETROUTE,
         payload: data,
      });
   };
}

export function getLevel(data) {
   return function (dispatch) {
      dispatch({
         type: GETLEVEL,
         payload: data,
      });
   };
}

export function getSpeed(data) {
   return function (dispatch) {
      dispatch({
         type: GETSPEED,
         payload: data,
      });
   };
}

export function onTitleChange(data) {
   return function (dispatch) {
      dispatch({
         type: ONTITLECHANGE,
         payload: data,
      });
   };
}

let initialState = {
   initialLocation: {},
   title: '',
   startTime: '',
   endTime: '',
   level: [],
   route: [],
   speed: [],
};

export function createPostReducer(state = initialState, action) {
   switch (action.type) {
      case GETINITIALLOCATION:
         return {
            ...state,
            initialLocation: action.payload,
         };
      case GETINITIALTIME:
         return {
            ...state,
            startTime: action.payload,
         };
      case GETFINALTIME:
         return {
            ...state,
            endTime: action.payload,
         };
      case GETROUTE:
         return {
            ...state,
            route: action.payload,
         };
      case GETLEVEL:
         return { ...state, level: action.payload };
      case GETSPEED:
         return {
            ...state,
            speed: action.payload,
         };
      case ONTITLECHANGE:
         return {
            ...state,
            title: action.payload,
         };
      default:
         return state;
   }
}
