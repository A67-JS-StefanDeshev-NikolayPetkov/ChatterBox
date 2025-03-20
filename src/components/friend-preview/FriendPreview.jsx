import "./FriendPreview.css";

import Avatar from "../avatar/Avatar";

function FriendPreview({ friend }) {
  const avatarProps = {
    imageUrl: friend.imageUrl,
    user: "user",
    status: friend.status,
    name: friend.username,
  };

  return (
    <div className="friend-preview">
      <Avatar {...avatarProps}></Avatar>
      <p>{friend.username}</p>
      <button>message</button>
      <button>remove</button>
    </div>
  );
}

export default FriendPreview;
