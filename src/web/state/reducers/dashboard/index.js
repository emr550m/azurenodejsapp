const INITIAL_STATE = {
  label: '',
};

export default function dashboard(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'UPDATE_LABEL':
      return Object.assign({}, state, { label: action.payload.label });
      break;
    default:
      return state
  }
};