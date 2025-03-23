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

export const createUserHandle = ({ username, uid, email, phoneNumber, profilePicture }) => {
  return set(ref(db, `users/${uid}/details`), {
    username,
    email,
    phoneNumber,
    profilePicture,
    createdOn: Date.now(),
  });
};

export const getUserDetailsByUid = (uid) => {
  return get(ref(db, `users/${uid}/details`));
};

export const getAllUserDataByUid = (uid) => {
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
      set(ref(db, `users/${uid}/details/status`), "online");
      onDisconnect(ref(db, `users/${uid}/details/status`)).set("offline");
    }
  });
};

export async function checkUserStatus(uid, callback) {
  const statusRef = ref(db, `users/${uid}/details/status`);

  const unsubscribe = onValue(statusRef, (snapshot) => {
    if (snapshot.exists()) callback(snapshot.val());
  });

  return () => unsubscribe();
}

export const updateUserStatus = (uid, status) => {
  return set(ref(db, `users/${uid}/details/status`), status);
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

        return user[1].details[searchBy]
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

export async function sendFriendRequest(senderUid, receiverUid) {
  const receivedRequests = ref(
    db,
    `users/${receiverUid}/friendRequests/received`
  );
  const sentRequests = ref(db, `users/${senderUid}/friendRequests/sent`);

  //Add to receiving end
  runTransaction(receivedRequests, (receivedRequests) => {
    if (!receivedRequests)
      return {
        [senderUid]: true,
      };
    receivedRequests = {
      ...receivedRequests,
      [senderUid]: true,
    };
    return receivedRequests;
  });

  //Add to sending end
  runTransaction(sentRequests, (sentRequests) => {
    if (!sentRequests)
      return {
        [receiverUid]: true,
      };
    sentRequests = {
      ...sentRequests,
      [receiverUid]: true,
    };
    return sentRequests;
  });
}

export async function cancelFriendRequest(senderUid, receiverUid) {
  const receivedRequestsRef = ref(
    db,
    `users/${receiverUid}/friendRequests/received`
  );
  const sentRequestsRef = ref(db, `users/${senderUid}/friendRequests/sent`);

  runTransaction(receivedRequestsRef, (currentData) => {
    if (!currentData) {
      return { [senderUid]: null };
    }
    currentData[senderUid] = null;
    return currentData;
  });

  runTransaction(sentRequestsRef, (currentData) => {
    if (!currentData) {
      return { [receiverUid]: null };
    }
    currentData[receiverUid] = null;
    return currentData;
  });
}

export async function acceptFriendRequest(senderUid, receiverUid) {
  const receivedRequestsRef = ref(
    db,
    `users/${receiverUid}/friendRequests/received`
  );
  const sentRequestsRef = ref(db, `users/${senderUid}/friendRequests/sent`);

  const receiverFriendsList = ref(db, `users/${receiverUid}/friends`);
  const senderFriendsList = ref(db, `users/${senderUid}/friends`);

  //Remove received request
  runTransaction(receivedRequestsRef, (currentData) => {
    if (!currentData) {
      return { [senderUid]: null };
    }
    currentData[senderUid] = null;
    return currentData;
  });

  //Remove sent request
  runTransaction(sentRequestsRef, (currentData) => {
    if (!currentData) {
      return { [receiverUid]: null };
    }
    currentData[receiverUid] = null;
    return currentData;
  });

  //Add to receiver friends list
  runTransaction(receiverFriendsList, (currentData) => {
    if (!currentData) {
      return { [senderUid]: true };
    }
    currentData[senderUid] = true;
    return currentData;
  });

  //Add to sender friends list
  runTransaction(senderFriendsList, (currentData) => {
    if (!currentData) {
      return { [receiverUid]: true };
    }
    currentData[receiverUid] = true;
    return currentData;
  });
}

export async function removeFromFriends(senderUid, receiverUid) {
  const receiverFriendsList = ref(db, `users/${receiverUid}/friends`);
  const senderFriendsList = ref(db, `users/${senderUid}/friends`);

  //Remove from friends list
  runTransaction(receiverFriendsList, (currentData) => {
    if (!currentData) {
      return { [senderUid]: null };
    }
    currentData[senderUid] = null;
    return currentData;
  });

  //Remove from friends list
  runTransaction(senderFriendsList, (currentData) => {
    if (!currentData) {
      return { [receiverUid]: null };
    }
    currentData[receiverUid] = null;
    return currentData;
  });
}

export async function fetchUsersData(userUids) {
  const requestsData = await Promise.all(
    userUids.map(async (uid) => {
      const snapshot = await get(ref(db, `users/${uid}/details`));
      const requestData = snapshot.val();
      requestData.uid = uid;
      return snapshot.exists() ? requestData : null;
    })
  );

  return requestsData.length > 0 ? requestsData : null;
}

export const updateUserDetails = async (uid, details) => {
  const userRef = ref(db, `users/${uid}/details`);
  return set(userRef, details);
};

export const deleteUserProfile = async (uid) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    await set(userRef, null);

    const detailsRef = ref(db, `users/${uid}/details/status`);
    await set(detailsRef, null);

    const friendsRef = ref(db, `friends/${uid}`);
    await set(friendsRef, null);

    const messagesRef = ref(db, `messages/${uid}`);
    await set(messagesRef, null);

    const teamsRef = ref(db, `teams/${uid}`);
    await set(teamsRef, null);

    console.log(`User data for UID ${uid} has been deleted.`);
  } catch (error) {
    console.error(`Error deleting user data for UID ${uid}:`, error);
    throw error;
  }
};