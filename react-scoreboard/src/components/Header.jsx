import PropTypes from "prop-types";
import Stats from "./Stats";
import Stopwatch from "./Stopwatch";

const Header = ({ title, players }) => {
  return (
    <header className="header">
      <Stats players={players} />
      <h1>{title}</h1>
      <Stopwatch />
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
};

export default Header;
