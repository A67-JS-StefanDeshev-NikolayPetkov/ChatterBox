//Misc
import "./UserPreview.css";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

//Components
import Avatar from "../avatar/Avatar";

function UserPreview({ user }) {
  return (
    <div className="user-container">
      <Avatar
        imgUrl={user.imageUrl}
        type="user-image"
      ></Avatar>
      <div className="user-details">
        <p className="user-name">{user.name}</p>
        <p className="user-email">{user.email}</p>
      </div>
      <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
    </div>
  );
}

export default UserPreview;
