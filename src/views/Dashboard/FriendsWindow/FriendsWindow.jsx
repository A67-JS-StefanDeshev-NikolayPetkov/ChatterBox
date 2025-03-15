import "./FriendsWindow.css";

//Components
import FriendsHeader from "./FriendsHeader/FriendsHeader";
import FriendsBody from "./FriendsBody/FriendsBody";
import AddFriendModal from "./AddFriendModal/AddFriendModal";

import { useState } from "react";

function FriendsWindow() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  return (
    <div className="friends-window">
      <FriendsHeader setIsAddFriendOpen={setIsAddFriendOpen}></FriendsHeader>
      <FriendsBody setIsAddFriendOpen={setIsAddFriendOpen}></FriendsBody>
      {isAddFriendOpen && (
        <AddFriendModal
          setIsAddFriendOpen={setIsAddFriendOpen}
        ></AddFriendModal>
      )}
    </div>
  );
}

export default FriendsWindow;
