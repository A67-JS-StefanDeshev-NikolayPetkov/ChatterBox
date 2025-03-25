import "./FriendPreview.css";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";

import Avatar from "../avatar/Avatar";

function FriendPreview({
  friend,
  senderUid,
  handleRemoveFromFriends,
  handleOpenChat,
  onStartVideoCall,
  onStartAudioCall,
}) {
  useEffect(() => console.log(friend));
  const avatarProps = {
    imageUrl: friend.profilePicture,
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
          onClick={() => handleOpenChat(friend.uid)}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faMinusSquare}
          className="icon-btn icon-big"
          onClick={() => handleRemoveFromFriends(senderUid, friend.uid)}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faPhone}
          className="icon-btn"
          onClick={onStartAudioCall}
        />
        <FontAwesomeIcon
          icon={faVideo}
          className="icon-btn"
          onClick={onStartVideoCall}
        />
      </div>
    </div>
  );
}

export default FriendPreview;
