//Style imports
import "./AddFriendModal.css";

//Component imports
import Loader from "../../../../components/loader/Loader";
import Center from "../../../../components/center/Center";

// //Dependency import
import { useState, useEffect } from "react";

//Services
import { searchUsers } from "../../../../services/users.service";
import UserPreview from "../../../../components/user-preview/UserPreview";
import StatusDropdown from "../../../../components/status-dropdown/StatusDropdown";

function AddFriendModal({ setIsAddFriendOpen }) {
  const [searchResult, setSearchResult] = useState(null);
  const [searchBy, setSearchBy] = useState("username");
  const [searchInputValue, setsSearchInputValue] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      className="friend-modal-overlay"
      onClick={() => setIsAddFriendOpen(false)}
    >
      <div
        className="friend-modal-content"
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
              searchResult.map((user) => {
                return <UserPreview user={user[1]}></UserPreview>;
              })
            ) : (
              <p>Found users will appear here.</p>
            )}
          </div>
        )}
        <button onClick={() => setIsAddFriendOpen(false)}>Close</button>
      </div>
    </div>
  );
}

export default AddFriendModal;
