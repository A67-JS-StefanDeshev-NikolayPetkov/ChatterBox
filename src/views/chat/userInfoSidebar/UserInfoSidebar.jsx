//Misc imports
import "./UserInfoSidebar.css";

//Dependency imports
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Components imports
import Button from "../../../components/button/Button";
import { getUserData } from "../../../services/users.service";

function UserInfoSidebar() {
  const { onLogout, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const username = Object.keys(data)[0]; // Extract the username
            setUsername(username);
          } else {
            console.error("User data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  if (!user) {
    handleLogout();
    return null;
  }

  return (
    <div className="user-info-sidebar">
      <p className="username">Username: {username}</p>
      <Button
        label="Logout"
        onClick={handleLogout}
        className="logout-button"
      ></Button>
    </div>
  );
}

export default UserInfoSidebar;
