import React from 'react';
import { render } from 'react-dom';
import App from './components';

import './../src/main.css';

render(
  (
    <App />
  ),
  document.getElementById('app'),
);
