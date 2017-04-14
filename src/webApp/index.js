require('./styles/app.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

ReactDOM.render(
 <App name="John"/>,
  document.getElementById('root')
);