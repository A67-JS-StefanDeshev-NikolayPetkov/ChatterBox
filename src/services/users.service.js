import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  onValue,
  onDisconnect,
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
