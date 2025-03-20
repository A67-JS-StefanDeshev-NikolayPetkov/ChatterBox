//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./AllFriends";
function AllFriends({ setOpenWindow }) {
  const { userData } = useContext(AppContext);

  if (!userData.friends || Object.keys(userData.friends).length < 1)
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
    <div className="all-friends-container center-flexbox">
      <div className="flex-column center-flexbox">
        {Object.keys(userData.friends).map((friendId) => (
          <p key={friendId}>{friendId}</p>
        ))}
      </div>
    </div>
  );
}

export default AllFriends;
