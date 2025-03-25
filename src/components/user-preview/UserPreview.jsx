//Misc
import "./UserPreview.css";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";

//Dependency imports
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

//Components
import Avatar from "../avatar/Avatar";

function UserPreview({
  renderButton,
  foundUser,
  handleFriendRequest,
  handleCancelFriendRequest,
}) {
  const [addButton, setAddButton] = useState(renderButton);
  const { user, userData } = useContext(AppContext);

  useEffect(() => {
    console.log(foundUser[1].details.profilePicture);
  }, []);
  return (
    <div className="user-preview-container">
      <div className="friend-details">
        <Avatar
          imageUrl={
            foundUser[1].details.profilePicture
              ? foundUser[1].details.profilePicture
              : null
          }
          type="user-image"
        ></Avatar>
        <div className="user-details">
          <p className="user-name">Username: {foundUser[1].details.username}</p>
          <p className="user-name">Email: {foundUser[1].details.email}</p>
        </div>
      </div>
      <div className="friend-actions">
        {addButton ? (
          <FontAwesomeIcon
            className="icon-btn icon-big"
            icon={faPlusSquare}
            onClick={() => {
              handleFriendRequest(user.uid, foundUser[0], setAddButton);
            }}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            className="icon-btn icon-big"
            icon={faMinusSquare}
            onClick={() => {
              handleCancelFriendRequest(user.uid, foundUser[0], setAddButton);
            }}
          ></FontAwesomeIcon>
        )}
      </div>
    </div>
  );
}

export default UserPreview;
