import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (username, uid, email) => {
  return set(ref(db, `users/${username}`), {
    uid,
    email,
    createdOn: Date.now(),
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

// export const updateUserStatus = (username, userData, status) => {
//   const userRef = ref(db, `users/${username}`);
//   const newUserData = { ...userData };
//   // newUserData.status = "online";
//   set(userRef, { ...newUserData });
// };
