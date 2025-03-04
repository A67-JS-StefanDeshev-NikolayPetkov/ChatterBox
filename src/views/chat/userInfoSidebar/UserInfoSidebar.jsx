//Misc imports
import "./UserInfoSidebar.css";

//Dependency imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Components imports
import Button from "../../../components/button/Button";

function UserInfoSidebar() {
  const { onLogout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="user-info-sidebar">
      <h2>User Info</h2>
      {/* Add your user info and previous chats here */}
      <Button
        label="Logout"
        onClick={handleLogout}
        className="logout-button"
      ></Button>
    </div>
  );
}

export default UserInfoSidebar;
