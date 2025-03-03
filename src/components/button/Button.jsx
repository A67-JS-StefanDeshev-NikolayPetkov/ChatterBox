import "./Button.css";
function SubmitButton({ label, onClick, className }) {
  return (
    <button
      className={`submit-button ${className}`}
      name={label}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SubmitButton;
