import React, { useContext, createContext, useState, ReactNode } from "react";
import { z } from "zod";

const UserDataSchema = z.object({
  name: z.string(),
});

type UserData = z.infer<typeof UserDataSchema>;

interface ContextProviderType {
  children: ReactNode;
}

interface UserContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

const defaultUserContext = {
  user: null,
  login: () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export default function UserProvider({ children }: ContextProviderType) {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    if (user === null) {
      try {
        setUser(UserDataSchema.parse(userData));
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error("Type error");
        }
      }
    } else {
      console.log("user already logged in");
    }
  };

  const logout = () => {
    if (user) {
      setUser(null);
    } else {
      console.log("no user found");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
