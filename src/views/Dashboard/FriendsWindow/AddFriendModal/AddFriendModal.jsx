//Style imports
import "./AddFriendModal.css";

//Component imports
import Loader from "../../../../components/loader/Loader";

// //Dependency import
import { useState, useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

//Services
import {
  searchUsers,
  sendFriendRequest,
  cancelFriendRequest,
  getUserByUid,
} from "../../../../services/users.service";
import UserPreview from "../../../../components/user-preview/UserPreview";
import StatusDropdown from "../../../../components/status-dropdown/StatusDropdown";

function AddFriendModal() {
  const { user, userData, setContext } = useContext(AppContext);
  const [searchResult, setSearchResult] = useState(null);
  const [searchBy, setSearchBy] = useState("username");
  const [searchInputValue, setsSearchInputValue] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFriendRequest(user, foundUser, setAddButton) {
    await sendFriendRequest(user, foundUser);
    setAddButton(false);
  }

  async function handleCancelFriendRequest(
    userUid,
    foundUserUid,
    setAddButton
  ) {
    cancelFriendRequest(userUid, foundUserUid);
    setAddButton(true);
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchInputValue)
      return setSearchError("Please enter search criteria");
    setLoading(true);

    try {
      const matchedUsers = await searchUsers(searchBy, searchInputValue);
      setSearchResult(matchedUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="all-friends-container"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Add a Friend</h2>

      <form
        className="friend-search-form"
        onSubmit={handleSearch}
      >
        {searchError && <p>{searchError}</p>}
        <input
          type="text"
          placeholder="Enter username or email"
          onChange={(e) => setsSearchInputValue(e.target.value)}
          className="friend-search-input"
        />
        <StatusDropdown
          status={searchBy}
          options={["username", "email"]}
          handleStatus={(option) => setSearchBy(option)}
        ></StatusDropdown>
      </form>
      {loading ? (
        <div className="friend-search-results">
          <Loader></Loader>
        </div>
      ) : (
        <div className="friend-search-results">
          {searchResult?.length > 0 ? (
            searchResult.map((foundUser) => {
              console.log;
              if (foundUser[0] === user.uid) return null;

              const sentRequests = userData?.friendRequests?.sent;
              const friendsList = userData?.friends;
              let renderButton = true;

              if (sentRequests) {
                if (Object.keys(sentRequests).includes(foundUser[0]))
                  renderButton = false;
              }

              if (friendsList) {
                if (Object.keys(friendsList).includes(foundUser[0]))
                  renderButton = false;
              }

              return (
                <UserPreview
                  key={foundUser[0]}
                  userUid={user.uid}
                  foundUser={foundUser}
                  handleFriendRequest={handleFriendRequest}
                  handleCancelFriendRequest={handleCancelFriendRequest}
                  renderButton={renderButton}
                ></UserPreview>
              );
            })
          ) : (
            <p>Found users will appear here.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AddFriendModal;
