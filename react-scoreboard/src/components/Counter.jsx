import PropTypes from "prop-types";

const Counter = (props) => {
  return (
    <div className="counter">
      <button
        className="counter-action decrement"
        onClick={() => props.onChange(-1)}
      >
        -
      </button>
      <span className="counter-score">{props.score}</span>
      <button
        className="counter-action increment"
        onClick={() => props.onChange(1)}
      >
        +
      </button>
    </div>
  );
};
Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Counter;
