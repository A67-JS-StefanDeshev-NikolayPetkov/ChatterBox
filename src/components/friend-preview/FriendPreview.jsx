import "./FriendPreview.css";

import Avatar from "../avatar/Avatar";

function FriendPreview({ friend }) {
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
        <button>message</button>
        <button>remove</button>
      </div>
    </div>
  );
}

export default FriendPreview;
