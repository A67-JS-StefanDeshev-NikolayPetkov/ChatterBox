import "./FriendsWindow.css";

//Components
import FriendsHeader from "./FriendsHeader/FriendsHeader";
import FriendsBody from "./FriendsBody/FriendsBody";
import AddFriendModal from "./AddFriendModal/AddFriendModal";

import { useState } from "react";

function FriendsWindow() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [openWindow, setOpenWindow] = useState("all");

  return (
    <div className="friends-window">
      <FriendsHeader setOpenWindow={setOpenWindow}></FriendsHeader>
      <FriendsBody
        setOpenWindow={setOpenWindow}
        openWindow={openWindow}
      ></FriendsBody>
    </div>
  );
}

export default FriendsWindow;
