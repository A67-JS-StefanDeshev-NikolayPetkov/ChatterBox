import "./FieldError.css";

function FieldError({ label }) {
  return <p className="error-message">{label}</p>;
}

export default FieldError;
