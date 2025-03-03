//Dependency
import { useState, useEffect, createContext } from "react";
import { logoutUser } from "../services/auth.service";
import { auth } from "../config/firebase-config";
import { getUserData } from "../services/users.service";
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

  const [user, loading, error] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({ user });
  }

  function onLogout() {
    logoutUser().then(() => {
      setAppState({ user: null, userData: null });
    });
  }

  return (
    <AppContext.Provider
      value={{
        user: appState.user,
        userData: appState.userData,
        setContext: setAppState,
        onLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
