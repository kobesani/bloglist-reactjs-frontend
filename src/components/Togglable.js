import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    buttonId: PropTypes.string.isRequired
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id={props.buttonId}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
