//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

//Dependency
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

//Services
import { fetchUsersData } from "../../services/users.service";

//Components
import FriendPreview from "../friend-preview/FriendPreview";

//CSS
import "./AllFriends.css";

//Component
function AllFriends({ setOpenWindow }) {
  const { userData } = useContext(AppContext);
  const [friendsData, setFriendsData] = useState(null);

  useEffect(() => {
    fetchUsersData(Object.keys(userData.friends)).then((data) =>
      setFriendsData(data)
    );
  }, []);

  useEffect(() => {
    console.log(friendsData);
  }, [friendsData]);

  if (!friendsData || friendsData.length < 1)
    return (
      <div className="all-friends-container center-flexbox">
        <div className="flex-column center-flexbox">
          <p>ZzZzZz...</p>
          <p> Add a friend and say hello:</p>
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="icon-btn icon-big"
            onClick={() => {
              setOpenWindow("add");
            }}
          />
        </div>
      </div>
    );

  return (
    <div className="all-friends-container">
      {friendsData.map((friend) => (
        <FriendPreview friend={friend}></FriendPreview>
      ))}
    </div>
  );
}

export default AllFriends;
