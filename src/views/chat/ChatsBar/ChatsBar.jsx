//Misc imports
import "./ChatsBar.css";

//Dependency imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Components imports
import Button from "../../../components/button/Button";

function ChatsBar() {
  const { onLogout, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="user-info-sidebar">
      <p className="username">Username: {userData.username}</p>
      <Button
        label="Logout"
        onClick={handleLogout}
        className="logout-button"
      ></Button>
    </div>
  );
}

export default ChatsBar;
