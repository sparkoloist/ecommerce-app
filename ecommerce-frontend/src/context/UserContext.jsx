import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

//MockUser
const mockUser = {
  id: 1,
  name: "Admin User",
  role: "admin", // change to "customer" to simulate a normal user
};

export const UserProvider = ({ children }) => {
  const [user] = useState(mockUser);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
