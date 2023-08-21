import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/App';
import store, { persistor } from './redux/store/store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<HashRouter>
				<App />
			</HashRouter>
		</PersistGate>
	</Provider>
);
