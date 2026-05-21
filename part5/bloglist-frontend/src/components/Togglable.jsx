import { useImperativeHandle, useState } from "react";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(!visible)

    const showWhenVisible = { display: visible ? "block" : "none" };
    const hideWhenVisible = { display: visible ? "none" : "block" };

    useImperativeHandle(props.ref, () => {
      return {toggleVisibility}
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
              {props.children}
              <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </>
    );
};

export default Togglable;
