import "./AddMembers.css";

import { createTeam } from "../../../services/teams.service";
import { validateMedia } from "../../../utils/helpers";

import SubmitButton from "../../../components/button/Button";

//Dependency
import { useNavigate } from "react-router-dom";

//Component imports
import Loader from "../../../components/loader/Loader";
// //Dependency import
import { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
//Services
import { searchUsers } from "../../../services/users.service";
import { addToTeam } from "../../../services/teams.service";
import UserPreview from "../../../components/user-preview/UserPreview";
import StatusDropdown from "../../../components/status-dropdown/StatusDropdown";
function AddMembers() {
  const { user, userData, setContext } = useContext(AppContext);
  const { teamId } = useParams();
  const [searchResult, setSearchResult] = useState(null);
  const [searchBy, setSearchBy] = useState("username");
  const [searchInputValue, setsSearchInputValue] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMembers, setCurrentMembers] = useState(null);

  //get current members

  //track current members

  //add to team members

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

  function handleAddMember() {}

  return (
    <div className="add-members-container">
      <div className="add-members-header">
        {" "}
        <h2>Add members</h2>
      </div>
      <div
        className="add-friends-container"
        onClick={(e) => e.stopPropagation()}
      >
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
                if (foundUser[0] === user.uid) return null;

                //   if (friendsList) {
                //     if (Object.keys(friendsList).includes(foundUser[0])) return;
                //   }

                return (
                  <UserPreview
                    key={foundUser[0]}
                    userUid={user.uid}
                    foundUser={foundUser}
                    handleFriendRequest={() => addToTeam(teamId, foundUser[0])}
                    renderButton={true}
                  ></UserPreview>
                );
              })
            ) : (
              <p>Found users will appear here.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMembers;
