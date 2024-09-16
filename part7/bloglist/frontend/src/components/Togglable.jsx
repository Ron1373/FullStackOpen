import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div>
      <button onClick={toggleVisibility} style={hideWhenVisible}>
        {props.showButtonLabel}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
      </div>
    </div>
  );
};

export default Togglable;
