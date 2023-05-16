import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);