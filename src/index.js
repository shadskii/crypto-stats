import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import storeSynchronize from 'redux-localstore'

const store = createStore(rootReducer);
storeSynchronize(store);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
