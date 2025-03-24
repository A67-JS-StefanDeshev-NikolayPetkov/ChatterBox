import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/home")} className="go-home-btn">
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;