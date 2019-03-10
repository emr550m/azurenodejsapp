const INITIAL_STATE = {
  label: '',
  name: '',
  surname: '',
  lastlogin: ''
};

export default function dashboard(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'UPDATE_LABEL':
      return Object.assign({}, state, { label: action.payload.label });
      break;
      case 'UPDATE_USERINFO':
      return Object.assign({}, state, { name: action.payload.name, surname: action.payload.surname , lastlogin: action.payload.lastlogin });
      break;
    default:
      return state
  }
};