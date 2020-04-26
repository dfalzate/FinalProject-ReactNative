const GETINITIALLOCATION = 'GETINITIALLOCATION';
const GETUSERID = 'GETUSERID';
const GETINITIALTIME = 'GETINITIALTIME';
const GETFINALTIME = 'GETFINALTIME';
const GETROUTE = 'GETROUTE';
const GETLEVEL = 'GETLEVEL';
const GETSPEED = 'GETSPEED';

export function getInitialLocation(data) {
  return function (dispatch) {
    dispatch({
      type: GETINITIALLOCATION,
      payload: data,
    });
  };
}

export function getUserId(data) {
  return function (dispatch) {
    dispatch({
      type: GETUSERID,
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

let initialState = {
  initialLocation: {
    accuracy: 14.940999984741211,
    altitude: 1547,
    heading: 345.2562561035156,
    latitude: 6.1928219,
    latitudeDelta: 1,
    longitude: -75.595108,
    longitudeDelta: 1,
    speed: 0.0034539280459284782,
  },
  user: '',
  title: 'Post title',
  comments: 'Comments',
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
    case GETUSERID:
      return {
        ...state,
        user: action.payload,
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
    default:
      return state;
  }
}
