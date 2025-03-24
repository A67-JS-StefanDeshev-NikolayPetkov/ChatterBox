//CSS
import "./FriendsHeader.css";

//Components
import PendingRequestsBubble from "../../../../components/pending-requests/PendingRequestsBubble/PendingRequestsBubble";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

function FriendsHeader() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);

  function handleClick(changeTo) {
    if (changeTo === filter) return;
    navigate(`/${user.uid}/friends/${changeTo}`);
  }

  return (
    <div className="friends-header">
      <h2>Friends</h2>
      <div
        className="friends-btn"
        onClick={() => handleClick("all")}
      >
        All
      </div>
      <div
        className="friends-btn"
        onClick={() => handleClick("online")}
      >
        Online
      </div>
      <div
        className="friends-btn pending-btn"
        onClick={() => handleClick("pending")}
      >
        Pending
        <PendingRequestsBubble></PendingRequestsBubble>
      </div>
      <div
        className="friends-btn"
        onClick={() => handleClick("add")}
      >
        Add friend
      </div>
    </div>
  );
}

export default FriendsHeader;
