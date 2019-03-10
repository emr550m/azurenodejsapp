const INITIAL_STATE = {
  title: 'AzureNodeJS App',
  page: 'Login',
  loading: false,
  dialog: false,
  dialogMessage: '',
  username: '',
  session: ''
};

export default function app(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return Object.assign({}, state, { title: action.payload.title });
      break;
    case 'UPDATE_PAGE':
      return Object.assign({}, state, { page: action.payload.page });
      break;
    case 'UPDATE_SESSION':
      return Object.assign({}, state, { username: action.payload.username, session: action.payload.session });
      break;
    case 'UPDATE_LOADER':
      return Object.assign({}, state, { loading: action.payload.loading });
      break;
    case 'UPDATE_DIALOG':
      return Object.assign({}, state, { dialog: action.payload.dialog, dialogMessage: action.payload.dialogMessage });
      break;
    default:
      return state
  }
};