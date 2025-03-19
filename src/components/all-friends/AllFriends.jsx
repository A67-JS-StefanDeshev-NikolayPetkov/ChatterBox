//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import "./AllFriends";
function AllFriends({ setOpenWindow }) {
  return (
    <div className="all-friends-container center-flexbox">
      <div className="flex-column center-flexbox">
        <p>ZzZzZz...</p>
        <p> Add a friend and say hello:</p>
        <FontAwesomeIcon
          icon={faPlusSquare}
          className="icon-btn icon-big"
          onClick={() => {
            setOpenWindow("add");
          }}
        />
      </div>
    </div>
  );
}

export default AllFriends;
