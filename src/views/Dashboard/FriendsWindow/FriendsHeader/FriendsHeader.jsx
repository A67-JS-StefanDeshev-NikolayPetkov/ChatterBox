//CSS
import "./FriendsHeader.css";

function FriendsHeader({ setIsAddFriendOpen }) {
  return (
    <div className="friends-header">
      <h2>Friends</h2>
      <div className="friends-btn">All</div>
      <div className="friends-btn">Online</div>
      <div className="friends-btn">Pending</div>
      <div
        className="friends-btn"
        onClick={() => setIsAddFriendOpen(true)}
      >
        Add friend
      </div>
    </div>
  );
}

export default FriendsHeader;
