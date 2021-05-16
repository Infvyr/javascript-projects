import PropTypes from "prop-types";
import Counter from "./Counter";

const Player = ({ name, score, onScoreChange, onRemovePlayer }) => {
  return (
    <div className="player">
      <div className="player-info">
        <h4 className="player-name">{name}</h4>
        <button className="player-remove" onClick={onRemovePlayer}>
          Remove
        </button>
      </div>
      <div className="player-score">
        <Counter score={score} onChange={onScoreChange} />
      </div>
    </div>
  );
};
Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired
};

export default Player;
