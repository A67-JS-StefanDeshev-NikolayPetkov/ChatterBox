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

export const updateChatMessages = function (chatId, callback) {
  const chatMessagesRef = ref(db, `/chats/${chatId}/messages`);

  //When messages change, update local messages via callback passed in
  const unsubscribe = onValue(chatMessagesRef, (snapshot) => {
    if (snapshot.exists())
      callback((prev) => {
        return { ...prev, messages: snapshot.val() };
      });
  });

  return () => unsubscribe();
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
    throw new Error("Error fetching chat data");
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

export const getChatsCount = async () => {
  try {
    const chatsRef = ref(db, "chats");
    const snapshot = await get(chatsRef);
    if (snapshot.exists()) {
      const chats = snapshot.val();
      return Object.keys(chats).length;
    }
    return 0;
  } catch (error) {
    throw new Error("Error fetching chats count");
  }
};