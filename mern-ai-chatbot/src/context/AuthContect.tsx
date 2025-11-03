import { createContext, useEffect, useState, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const login = async (email: string, password: string) => {
    // Example: You can set dummy login here
    setUser({ name: "Akash", email });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const value: UserAuth = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
