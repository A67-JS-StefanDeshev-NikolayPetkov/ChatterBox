import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  onValue,
  onDisconnect,
  runTransaction,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const createUserHandle = (username, uid, email) => {
  return set(ref(db, `users/${uid}`), {
    username,
    email,
    createdOn: Date.now(),
  });
};

export const getUserByUid = (uid) => {
  return get(ref(db, `users/${uid}`));
};

export const getUserByUsername = (username) => {
  return get(
    query(ref(db, "users"), orderByChild("username"), equalTo(username))
  );
};

export const isUserOnline = (uid) => {
  const connectedRef = ref(db, ".info/connected");

  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      set(ref(db, `users/${uid}/status`), "online");
      onDisconnect(ref(db, `users/${uid}/status`)).set("offline");
    }
  });
};

export const updateUserStatus = (uid, status) => {
  return set(ref(db, `users/${uid}/status`), status);
};

export const searchUsers = async (searchBy = "username", searchValue) => {
  try {
    const snapshot = await get(ref(db, "users"));
    if (snapshot.exists()) {
      const users = snapshot.val();

      let filteredUsers = Object.entries(users).filter((user) => {
        //If we decide that the search should be exact, use this:
        // return (
        //   user[1][searchBy].toLowerCase() === searchValue.toLowerCase()
        // );

        return user[1][searchBy]
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      return filteredUsers;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
};

export async function sendFriendRequest(sender, receiver) {
  const receivedRequests = ref(
    db,
    `users/${receiver.uid}/friendRequests/received`
  );
  const sentRequests = ref(db, `users/${sender.uid}/friendRequests/sent`);

  //Add to receiving end
  runTransaction(receivedRequests, (receivedRequests) => {
    if (!receivedRequests)
      return {
        [sender.uid]: {
          email: sender.email,
          username: sender.username,
          uid: null,
        },
      };
    receivedRequests = {
      ...receivedRequests,
      [sender.uid]: {
        email: sender.email,
        username: sender.username,
        uid: null,
      },
    };
    return receivedRequests;
  });

  //Add to sending end
  runTransaction(sentRequests, (sentRequests) => {
    if (!sentRequests)
      return {
        [receiver.uid]: {
          email: receiver.email,
          username: receiver.username,
          uid: null,
        },
      };
    sentRequests = {
      ...sentRequests,
      [receiver.uid]: {
        email: receiver.email,
        username: receiver.username,
        uid: null,
      },
    };
    return sentRequests;
  });
}

export async function cancelFriendRequest(sender, receiver) {
  const receivedRequestsRef = ref(
    db,
    `users/${receiver.uid}/friendRequests/received`
  );
  const sentRequestsRef = ref(db, `users/${sender.uid}/friendRequests/sent`);

  runTransaction(receivedRequestsRef, (currentData) => {
    if (!currentData) {
      return { [sender.uid]: null };
    }
    currentData[sender.uid] = null;
    return currentData;
  });

  runTransaction(sentRequestsRef, (currentData) => {
    if (!currentData) {
      return { [receiver.uid]: null };
    }
    currentData[receiver.uid] = null;
    return currentData;
  });
}
