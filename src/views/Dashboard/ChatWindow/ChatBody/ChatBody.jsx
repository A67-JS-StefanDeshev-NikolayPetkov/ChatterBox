//Styles
import "./ChatBody.css";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

//Dependency imports
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

//Component imports
import UserPreview from "../../../../components/user-preview/UserPreview";
function ChatBody({ setIsAddFriendOpen }) {
  const { userData } = useContext(AppContext);

  if (!userData.friends)
    return (
      <div className="chat-body">
        <div className="messages-container center-flexbox">
          <div className="flex-column center-flexbox">
            <p>ZzZzZz...</p>
            <p> Add a friend and say hello:</p>
            <FontAwesomeIcon
              icon={faPlusSquare}
              className="icon-btn icon-big"
              onClick={() => {
                setIsAddFriendOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="chat-body">
      <div className="messages-container">
        {[
          {
            email: "stefandeshev@gmail.com",
            username: "deshev1",
            imageUrl: null,
          },
        ].map((friend) => {
          return <UserPreview user={friend}></UserPreview>;
        })}
      </div>
    </div>
  );
}

export default ChatBody;
