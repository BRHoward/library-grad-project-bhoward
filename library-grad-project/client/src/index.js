import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import libraryApp from './reducers/reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './css/App.css';

let store = createStore(
	libraryApp,
	applyMiddleware(
		thunkMiddleware
	)
);

injectTapEventPlugin();

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Provider>,
  document.getElementById('root')
);