import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Player from './components/Player';
import AddPlayerForm from './components/AddPlayerForm';

export default function App({ initialPlayers }) {
	const [state, setState] = useState(initialPlayers);

	const onScoreChange = (index, delta) => {
		//console.log("onScoreChange", index, delta);
		setState((initialPlayers[index].score += delta));
	};

	const onPlayerAdd = (name) => {
		setState(
			initialPlayers.push({
				name: name,
				score: 0,
				id: new Date().getTime()
			})
		);
	};

	const onRemovePlayer = (index) => {
		setState(initialPlayers.splice(index, 1));
	};

	return (
		<div className="App">
			<div className="scoreboard">
				<Header title="Scoreboard" players={initialPlayers} />
				<div className="players">
					{initialPlayers.map((player, index) => {
						return (
							<Player
								key={player.id}
								name={player.name}
								score={player.score}
								onScoreChange={(delta) =>
									onScoreChange(index, delta)
								}
								onRemovePlayer={() => onRemovePlayer(index)}
							/>
						);
					})}
				</div>
				<AddPlayerForm onAdd={onPlayerAdd} />
			</div>
		</div>
	);
}

App.propTypes = {
	title: PropTypes.string,
	initialPlayers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			score: PropTypes.number.isRequired,
			id: PropTypes.number.isRequired
		})
	)
};
