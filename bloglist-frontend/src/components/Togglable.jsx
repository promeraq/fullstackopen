import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible} className="showContent">
        <button onClick={toggleVisibility}>{props.buttonShow}</button>
      </div>
      <div style={showWhenVisible} className="hideContent">
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonHide}</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonShow: PropTypes.string.isRequired,
  buttonHide: PropTypes.string.isRequired,
};

export default Togglable;
