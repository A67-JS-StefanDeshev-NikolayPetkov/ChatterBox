//Misc imports
import "./Dashboard.css";

//Component imports
import TeamsBar from "./TeamsBar/TeamsBar";
import ChatsBar from "./ChatsBar/ChatsBar";
import ChatWindow from "./ChatWindow/ChatWindow";
import FriendsWindow from "./FriendsWindow/FriendsWindow";
import Loader from "../../components/loader/Loader";
import Center from "../../components/center/Center";

//Dependency
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, userData } = useContext(AppContext);
  const [friendsWindow, setFriendsWindow] = useState(true);
  const [selectedTeamChannels, setSelectedTeamChannels] = useState([]);

  const navigate = useNavigate();

  useEffect(() => console.log("userData in dashboard", userData));

  //If no user, go to home page
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  //Once we get the userData, go to updated route
  useEffect(() => {
    if (userData) {
      navigate(
        `/dashboard/${userData.details.username}${
          userData.chats ? userData.chats[0] : ""
        }`
      );
    }
  }, [userData]);

  if (!userData)
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

  return (
    <div className="app-container">
      <TeamsBar setSelectedTeamChannels={setSelectedTeamChannels} />
      <ChatsBar
        setFriendsWindow={setFriendsWindow}
        channels={selectedTeamChannels}
      />
      {friendsWindow ? <FriendsWindow /> : <ChatWindow />}
    </div>
  );
}

export default Dashboard;

// //DUMMY DATA
// const [users, setUsers] = useState([
//   { id: "sadf3", name: "MelonMan", imageUrl: null, status: "online" },
//   { id: "sadf4", name: "Pesho0o0o", imageUrl: null, status: "away" },
//   { id: "sadf5", name: "Pistaka", imageUrl: null, status: "busy" },
// ]);

// const [chats, setChats] = useState([
//   {
//     id: "asdf1",
//     name: "GroupChat: Civilization 5 ",
//     members: [users[0], users[1]],

//     messages: {
//       msg0: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "OPA!",
//         timestamp: 171035510000,
//       },
//       msg3: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "Nice! Same here, just fixing some bugs.",
//         timestamp: 1710355320000,
//       },
//       msg4: {
//         senderId: "user789",
//         receiverId: "user123",
//         text: "Hey! Are we still on for tomorrow?",
//         timestamp: 1710355380000,
//       },
//       msg1: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "Hey, how's it going?",
//         timestamp: 1710355200000,
//       },
//       msg2: {
//         senderId: "user456",
//         receiverId: "user123",
//         text: "All good! Just working on a project. You?",
//         timestamp: 1710355260000,
//       },

//       msg5: {
//         senderId: "user123",
//         receiverId: "user789",
//         text: "Yep! Looking forward to it. See you at 5 PM!",
//         timestamp: 1710355440000,
//       },
//       msg6: {
//         senderId: "user456",
//         receiverId: "user123",
//         text: "BTW, did you check out the new feature update?",
//         timestamp: 1710355500000,
//       },
//       msg7: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "Yeah! Looks awesome. We should test it later.",
//         timestamp: 1710355560000,
//       },
//       msg8: {
//         senderId: "user789",
//         receiverId: "user123",
//         text: "Cool! Let me know if there's any change in plans.",
//         timestamp: 1710355620000,
//       },
//     },
//   },
//   {
//     id: "asd2",
//     name: "CS 1.6",
//     members: [userData, users[2]],
//     messages: {
//       msg3: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "Nice! Just relaxing now.",
//         type: "text",
//         timestamp: 1710355320000,
//       },
//       msg4: {
//         senderId: "user456",
//         receiverId: "user123",
//         text: "Check out this picture!",
//         type: "image",
//         mediaUrl: "https://example.com/image.jpg",
//         timestamp: 1710355380000,
//       },
//       msg1: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "Hey, how's your day going?",
//         type: "text",
//         timestamp: 1710355200000,
//       },
//       msg2: {
//         senderId: "user456",
//         receiverId: "user123",
//         text: "Pretty good! Just finished a project. You?",
//         type: "text",
//         timestamp: 1710355260000,
//       },

//       msg5: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "Whoa! That looks amazing.",
//         type: "text",
//         timestamp: 1710355440000,
//       },
//       msg6: {
//         senderId: "user456",
//         receiverId: "user123",
//         text: "Here's a song I think you'll like!",
//         type: "audio",
//         mediaUrl: "https://example.com/audio.mp3",
//         timestamp: 1710355500000,
//       },
//       msg7: {
//         senderId: "user123",
//         receiverId: "user456",
//         text: "Let me listen to it now!",
//         type: "text",
//         timestamp: 1710355560000,
//       },
//       msg8: {
//         senderId: "user456",
//         receiverId: "user123",
//         text: "Here's a quick video from today!",
//         type: "video",
//         mediaUrl: "https://example.com/video.mp4",
//         timestamp: 1710355620000,
//       },
//     },
//   },
// ]);
// //DUMMY DATA END
