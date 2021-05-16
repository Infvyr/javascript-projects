import { React, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import PLAYERS from './data';
import App from './App';
import './style.css';

const rootElement = document.getElementById('mainApp');
ReactDOM.render(
	<StrictMode>
		<App initialPlayers={PLAYERS} />
	</StrictMode>,
	rootElement
);
