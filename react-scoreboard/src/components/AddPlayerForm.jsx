import PropTypes from "prop-types";
import { useState } from "react";

const AddPlayerForm = (props) => {
  const [name, setName] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onAdd(name);
    setName("");
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="add-player-form">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="player-add"
          value={name}
          onChange={onNameChange}
        />
        <input type="submit" className="btn" value="Add" />
      </form>
    </div>
  );
};

AddPlayerForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default AddPlayerForm;
