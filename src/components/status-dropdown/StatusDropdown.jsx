//Misc
import "./StatusDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

//Dependency
import { useState } from "react";

function StatusDropdown({ status, handleStatus }) {
  const options = ["online", "away", "dont-disturb", "offline"];
  const [open, setOpen] = useState(false);

  return (
    <div
      className="status-dropdown"
      onClick={() => setOpen(!open)}
      options={options}
    >
      <div className="status-container">
        <p className="status">{status}</p>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`icon ${open ? "rotated" : ""}`}
        ></FontAwesomeIcon>
      </div>
      <div className={`status-dropdown-options ${open ? "show" : ""}`}>
        {options.length >= 0 &&
          options.map((option) => (
            <span
              key={option}
              onClick={() => handleStatus(option)}
              className="dropdown-option"
            >
              {option}
            </span>
          ))}
      </div>
    </div>
  );
}

export default StatusDropdown;
