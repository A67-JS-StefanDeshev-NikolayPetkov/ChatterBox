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

//Dependency
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Dashboard({
  isCreateChat,
  isCreateTeam,
  isFriendsWindow,
  isChatWindow,
}) {
  const { user, userData } = useContext(AppContext);
  const { teamId, chatId, filter } = useParams();
  const navigate = useNavigate();

  //If no user, go to home page
  useEffect(() => {
    console.log(isCreateChat && user.uid === teamId);
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(isCreateChat, isCreateTeam, isFriendsWindow, isChatWindow);
    console.log(teamId, chatId, filter);
  });

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
    </div>
  );
}

export default Dashboard;
