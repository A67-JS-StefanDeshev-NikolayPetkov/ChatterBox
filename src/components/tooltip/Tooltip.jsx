import "./Tooltip.css";

function Tooltip({ text, position }) {
  return <div className={`tooltip ${position}`}>{text}</div>;
}

export default Tooltip;
