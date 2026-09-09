
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { getLocalUser, logoutLocalUser } from "@/lib/local-auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication when the application starts
  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = () => {
    setIsLoadingAuth(true);
    setAuthError(null);

    const currentUser = getLocalUser();
    setUser(currentUser ? { email: currentUser.email } : null);
    setIsAuthenticated(Boolean(currentUser));
    setAuthChecked(true);
    setIsLoadingAuth(false);
  };

  // Logout
  const logout = (shouldRedirect = true) => {
    logoutLocalUser();

    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);

    if (shouldRedirect) {
      window.location.href = "/login";
    }
  };

  // Go to login page
  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,

        // Kept for compatibility with components
        // that may still expect these properties.
        isLoadingPublicSettings: false,
        appPublicSettings: null,

        authError,
        authChecked,

        logout,
        navigateToLogin,
        checkUserAuth,

        // Compatibility alias
        checkAppState: checkUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};

