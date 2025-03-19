//CSS
import "./FriendsHeader.css";

//Components
import PendingRequestsBubble from "../../../../components/pending-requests/PendingRequestsBubble/PendingRequestsBubble";

function FriendsHeader({ setOpenWindow }) {
  return (
    <div className="friends-header">
      <h2>Friends</h2>
      <div
        className="friends-btn"
        onClick={() => setOpenWindow("all")}
      >
        All
      </div>
      <div
        className="friends-btn"
        onClick={() => setOpenWindow("online")}
      >
        Online
      </div>
      <div
        className="friends-btn pending-btn"
        onClick={() => setOpenWindow("pending")}
      >
        Pending
        <PendingRequestsBubble></PendingRequestsBubble>
      </div>
      <div
        className="friends-btn"
        onClick={() => setOpenWindow("add")}
      >
        Add friend
      </div>
    </div>
  );
}

export default FriendsHeader;
