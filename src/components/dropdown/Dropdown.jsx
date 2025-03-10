//Misc
import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

//Dependency
import { useState, useEffect } from "react";

/**
 *
 * @param {object} props
 * @param {array} props.options array of strings representing the dropdown menu options
 * @param {string} props.status the status of the user
 * @param {function} props.setStatus the set state function that sets the status
 * @returns
 */
function Dropdown({ options, userData }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <div
      className="dropdown"
      onClick={() => setOpen(!open)}
      options={options}
    >
      <div className="status-container">
        <p className="status">userData.status</p>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`icon ${open ? "rotated" : ""}`}
        ></FontAwesomeIcon>
      </div>
      <div className={`dropdown-options ${open ? "show" : ""}`}>
        {options.length >= 0 &&
          options.map((option) => (
            <span
              key={option}
              onClick={() => (userData.status = option)}
              className="dropdown-option"
            >
              {option}
            </span>
          ))}
      </div>
    </div>
  );
}

export default Dropdown;
