import "./FriendPreview.css";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

import Avatar from "../avatar/Avatar";

function FriendPreview({ friend, senderUid, handleRemoveFromFriends }) {
  const avatarProps = {
    imageUrl: friend.imageUrl,
    status: friend.status,
    name: friend.username,
  };

  return (
    <div className="friend-preview">
      <div className="friend-preview-details">
        <Avatar {...avatarProps}></Avatar>
        <p>{friend.username}</p>
      </div>
      <div className="friend-preview-btns">
        <FontAwesomeIcon
          icon={faMessage}
          className="icon-btn icon-big"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faMinusSquare}
          className="icon-btn icon-big"
          onClick={() => handleRemoveFromFriends(senderUid, friend.uid)}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default FriendPreview;
