const INITIAL_STATE = {
  username: '',
  password: ''
};

export default function login(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return Object.assign({}, state, { username: action.payload.username });
      break;
    case 'UPDATE_PASSWORD':
      return Object.assign({}, state, { password: action.payload.password });
      break;
    default:
      return state
  }
};