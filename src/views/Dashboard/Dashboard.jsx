//Misc imports
import "./Dashboard.css";

//Component imports
import TeamsBar from "./TeamsBar/TeamsBar";
import ChatsBar from "./ChatsBar/ChatsBar";
import ChatWindow from "./ChatWindow/ChatWindow";
import FriendsWindow from "./FriendsWindow/FriendsWindow";
import Loader from "../../components/loader/Loader";
import Center from "../../components/center/Center";
import CreateTeam from "./CreateTeam/CreateTeam";
import CreateTeamChat from "./CreateTeamChat/CreateTeamChat";
import CreateGroupChat from "./CreateGroupChat/CreateGroupChat";
import AddMembers from "./AddMembers/AddMembers";

//Dependency
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Dashboard({
  isCreateChat,
  isCreateTeam,
  isFriendsWindow,
  isChatWindow,
  isAddMembers,
}) {
  const { user, userData } = useContext(AppContext);
  const { teamId, chatId, filter } = useParams();
  const navigate = useNavigate();

  //If no user, go to home page
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  if (!userData)
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

  return (
    <div className="app-container">
      <TeamsBar />
      <ChatsBar />
      {isFriendsWindow && <FriendsWindow />}
      {isCreateTeam && <CreateTeam />}
      {isCreateChat && user.uid === teamId && <CreateGroupChat />}
      {isCreateChat && !(user.uid === teamId) && <CreateTeamChat />}
      {isChatWindow && <ChatWindow></ChatWindow>}
      {isAddMembers && <AddMembers></AddMembers>}
    </div>
  );
}

export default Dashboard;
