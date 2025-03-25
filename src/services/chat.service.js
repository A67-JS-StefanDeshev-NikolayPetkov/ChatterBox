import {
  get,
  set,
  ref,
  push,
  query,
  equalTo,
  orderByChild,
  onValue,
  onDisconnect,
  runTransaction,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const sendMessage = async function (messageObject, chatId) {
  const newMessageRef = await push(ref(db, `/chats/${chatId}/messages`));
  return await set(newMessageRef, messageObject);
};

/**
 *Subscribes to real-time updates of messages of given chat.
 * @param {string} chatId Id of chat to track.
 * @param {function} callback State update function that will update component state to most up-to-date messages.
 * @returns {function} Unsubscribe function used to stop listening for changes on unmount.
 */
export const updateChatMessages = function (chatId, callback) {
  const chatMessagesRef = ref(db, `/chats/${chatId}/messages`);

  //When messages change, update local messages via callback passed in
  const unsubscribe = onValue(chatMessagesRef, (snapshot) => {
    if (snapshot.exists())
      callback((prev) => {
        return { ...prev, messages: snapshot.val() };
      });
  });

  return unsubscribe;
};

//DMs
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
    console.error(error.message);
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

  return chatId;
};

export const checkIfDmsExist = async function (userChats, receiverUid) {
  let existingChatId;

  //loop through all chats and check if it already exists
  for (const chatId in userChats) {
    const chatRef = ref(db, `chats/${chatId}`);
    const chatSnapshot = await get(chatRef);
    const chatData = chatSnapshot.val();

    if (Object.keys(chatData.members).includes(receiverUid)) {
      existingChatId = chatId;
      break;
    }
  }
  if (existingChatId) return existingChatId;
};

export const getChatMembersDetails = async function (chatId) {
  const chatMembersRef = ref(db, `chats/${chatId}/members`);
  const chatMembers = Object.keys((await get(chatMembersRef)).val());

  const result = await Promise.all(
    chatMembers.map(async (userId) => {
      const userRef = ref(db, `users/${userId}/details`);
      let result = await get(userRef);
      result = result.val();
      result.id = userId;
      return result;
    })
  );

  return result;
};

// Function to get channels for a team
export const getChatsDetails = async (teamId, isUser) => {
  const sourceRef = isUser
    ? ref(db, `users/${teamId}/chats`)
    : ref(db, `teams/${teamId}/details/chats`);
  let chats = (await get(sourceRef)).val();
  let chatsDetails = await Promise.all(
    Object.keys(chats).map(async (chatId) => {
      const chatRef = isUser
        ? ref(db, `chats/${chatId}`)
        : ref(db, `chats/${chatId}/details`);
      const chatDetails = (await get(chatRef)).val();

      chatDetails.id = chatId;
      return chatDetails;
    })
  );

  return chatsDetails;
};
export const subscribeToChats = function (teamId, isUser, callback) {
  const reference = isUser
    ? ref(db, `/users/${teamId}/chats`)
    : ref(db, `/teams/${teamId}/details/chats`);

  //When messages change, update local messages via callback passed in
  const unsubscribe = onValue(reference, (snapshot) => {
    if (snapshot.exists()) callback(Object.keys(snapshot.val()));
  });

  return unsubscribe;
};

export const createGroupChat = async (
  memberIds,
  name,
  imageUrl = "default-chat.png"
) => {
  if (name.length < 3 || name.length > 40) {
    throw new Error("Channel name must be between 3 and 40 characters.");
  }
  const chatsRef = ref(db, `chats`);
  const newChatRef = push(chatsRef);

  await Promise.all(
    memberIds.forEach(async (member) => {
      const memberRef = ref(db, `users/${member}/details/chats`);
      await update(memberRef, { [newChatRef]: true });
    })
  );

  const chatData = {
    details: { name, imageUrl },
    members: memberIds.reduce((acc, id) => {
      acc[id] = true;
      return true;
    }, {}),
  };

  await set(newChatRef, chatData);
};
