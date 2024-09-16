import { Button } from "@mui/material";
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
      <Button
        color="success"
        variant="contained"
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        {props.showButtonLabel}
      </Button>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <Button color="error" variant="contained" onClick={toggleVisibility}>
          {props.hideButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
