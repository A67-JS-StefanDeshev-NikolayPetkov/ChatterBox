//Misc imports
import "./input.css";

function Input ({ value, setValue, placeholder, className }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={className}
    />
  );
};

export default Input;