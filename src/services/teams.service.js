import { get, set, ref, push, update } from "firebase/database";
import { db } from "../config/firebase-config";

const teamsRef = ref(db, "teams/");

// Function to create a new team
export const createTeam = async (
  name,
  ownerId,
  members = [],
  channels = [],
  imageUrl = "default-team.png"
) => {
  if (name.length < 3 || name.length > 40) {
    throw new Error("Team name must be between 3 and 40 characters.");
  }

  // Check if team name already exists
  const snapshot = await get(teamsRef);
  const teams = snapshot.val();
  if (teams) {
    const nameExists = Object.values(teams).some((team) => team.name === name);
    if (nameExists) throw new Error("Team name already exists.");
  }

  // Create a new team with a unique ID
  const newTeamRef = push(teamsRef);
  const teamId = newTeamRef.key;
  const teamData = {
    id: teamId,
    name,
    owner: ownerId,
    members,
    channels,
    imageUrl,
  };

  await set(newTeamRef, teamData);

  const updates = {};
  members.forEach((memberUid) => {
    updates[`users/${memberUid}/teams/${teamId}`] = true;
  });
  await update(ref(db), updates);

  //Create a default "General" channel for the team
  await createDefaultChannel(teamId, "General", [ownerId], true);
  return teamData;
};

//function to get all teams
export const getTeams = async () => {
  try {
    const teamsRef = ref(db, "teams");
    const snapshot = await get(teamsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    throw new Error("Failed to load teams");
  }
};

// Function to get channels for a team
export const getChannels = async (teamId) => {
  try {
    const channelsRef = ref(db, `teams/${teamId}/channels`);
    const snapshot = await get(channelsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error("Error fetching channels:", error);
    throw error;
  }
};

// Function to create a new channel
export const createTeamChat = async (
  teamId,
  title,
  participants,
  isPublic,
  imageUrl = "default-chat.png"
) => {
  if (title.length < 3 || title.length > 40) {
    throw new Error("Channel title must be between 3 and 40 characters.");
  }
  if (participants.length < 1) {
    throw new Error("A channel must have at least one participant.");
  }

  const channelsRef = ref(db, `teams/${teamId}/channels`);
  const newChannelRef = push(channelsRef);
  const channelId = newChannelRef.key;
  const channelData = {
    id: channelId,
    title,
    participants,
    isPublic,
    imageUrl,
  };

  "Saving Channel Data:", channelData;

  await set(newChannelRef, channelData);
  return channelData;
};

// Function to create a default "General" channel if no channels exist
export const createDefaultChannel = async (teamId, ownerId) => {
  const channels = await getChannels(teamId);
  if (!channels) {
    await createTeamChat(teamId, "General", [ownerId], true);
  }
};

export const startDms = async function (senderUid, receiverUid) {
  //references to new chat and sender/receiver chats object
  const chatsRef = ref(db, `chats`);
  const senderRef = ref(db, `users/${senderUid}/chats`);
  const receiverRef = ref(db, `users/${receiverUid}/chats`);

  //Create and get new chat id
  const newChatRef = push(chatsRef);
  const chatId = newChatRef.key;

  // Create and get first message id
  // const messagesRef = ref(db, `chats/${chatId}/messages`);
  // const newMessageRef = push(messagesRef);
  // const messageId = newMessageRef.key;

  //get sender and receiver chat lists
  const senderSnapshot = await get(senderRef);
  const receiverSnapshot = await get(receiverRef);

  //Format new entry depending on if chats object exists
  const senderNewChats = senderSnapshot.exists()
    ? { ...senderSnapshot.val(), [chatId]: true }
    : { [chatId]: true };
  const receiverNewChats = receiverSnapshot.exists()
    ? { ...receiverSnapshot.val(), [chatId]: true }
    : { [chatId]: true };

  const chatData = {
    type: "dm",
    members: { [senderUid]: true, [receiverUid]: true },
    // messages: { [messageId]: messageContent },
  };

  try {
    await Promise.all(
      set(newChatRef, chatData),
      set(senderRef, senderNewChats),
      set(receiverRef, receiverNewChats)
    );
  } catch (e) {
    console.error(e);
  } finally {
  }

  console.log(chatId);

  return chatId;
};

export const checkIfDmsExist = async function (userChats, receiverUid) {
  let existingChatId;

  //loop through all chats and check if it already exists
  for (const chatId in userChats) {
    const chatRef = ref(db, `chats/${chatId}`);
    const chatSnapshot = await get(chatRef);
    const chatData = chatSnapshot.val();

    if (
      chatData.type === "dm" &&
      Object.keys(chatData.members).includes(receiverUid)
    ) {
      existingChatId = chatId;
      break;
    }
  }
  if (existingChatId) return existingChatId;
};

export const sendMessage = async function () {};

export const fetchChatData = async (chatId) => {
  try {
    const chatRef = ref(db, `chats/${chatId}`);
    const snapshot = await get(chatRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("Chat not found");
    }
  } catch (error) {
    throw new Error("Error fetching chat data");
  }
};

export const getUserTeams = async (userId) => {
  try {
    const userTeamsRef = ref(db, `users/${userId}/teams`);
    const userTeamsSnapshot = await get(userTeamsRef);
    return userTeamsSnapshot.val();
  } catch (error) {
    throw new Error("Failed to fetch user teams");
  }
};