import { createContext, useContext, useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export const queryClient = new QueryClient();

const UsersContext = createContext();

function UsersProvider({ children }) {
  function useLocalStorage(key, fallback) {
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem(key) ?? fallback
    );

    useEffect(
      function () {
        localStorage.setItem(key, isLoggedIn);
      },
      [key, isLoggedIn]
    );

    return [isLoggedIn, setIsLoggedIn];
  }

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("logged", false);

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch(`${API_URL}/api/v1/users`, {
        method: "POST",
        body: JSON.stringify([newUser]),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to create user");
      }

      return response.json();
    },
  });

  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return fetch(`${API_URL}/api/v1/users`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${API_KEY}`,
        },
      }).then((res) => res.json());
    },
  });

  return (
    <UsersContext.Provider
      value={{
        API_KEY,
        API_URL,
        mutation,
        getUsers,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

function UseUsersContext() {
  const context = useContext(UsersContext);

  if (context === undefined)
    throw new Error("context used outside the Provider");

  return context;
}

export { UseUsersContext, UsersProvider };
