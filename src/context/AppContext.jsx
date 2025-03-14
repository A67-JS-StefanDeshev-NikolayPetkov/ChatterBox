//Dependency
import { useState, useEffect, createContext } from "react";
import { logoutUser } from "../services/auth.service";
import { auth } from "../config/firebase-config";
import { getUserByUid, isUserOnline } from "../services/users.service";
import { useAuthState } from "react-firebase-hooks/auth";

export const AppContext = createContext({
  user: null,
  userData: null,
  setContext() {},
  onLogout() {},
});

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user, loading] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({ user });
  }

  function onLogout() {
    logoutUser().then(() => {
      setAppState({ user: null, userData: null });
    });
  }

  useEffect(() => {
    if (user === null) return;
    isUserOnline(user.uid);

    getUserByUid(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Couldnt get user data.");
        }

        setAppState({
          ...appState,
          userData: { ...snapshot.val() },
        });
      })
      .catch((e) => alert(e.message));
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user: appState.user,
        userData: appState.userData,
        loading,
        setContext: setAppState,
        onLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
