import PropTypes from "prop-types";

const Stats = ({ players }) => {
  const totalPlayers = players.length;
  const totalPoints = players.reduce(
    (total, player) => (total += player.score),
    0
  );

  return (
    <div className="stats">
      <p>
        Players: <b>{totalPlayers}</b>
      </p>
      <p>
        Total Points: <b>{totalPoints}</b>
      </p>
    </div>
  );
};
Stats.propTypes = {
  players: PropTypes.array.isRequired
};

export default Stats;
