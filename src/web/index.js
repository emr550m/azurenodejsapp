import ReactDOM from 'react-dom';
import React from 'react';
import  App  from './app';


import { Provider } from 'react-redux';
import store from './state/store';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('container'));
