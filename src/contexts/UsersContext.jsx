import { createContext, useContext, useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export const queryClient = new QueryClient();

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [curUser, setCurUser] = useState("");

  function useLocalStorage(key, fallback) {
    const item = localStorage.getItem(key);
    const [isLoggedIn, setIsLoggedIn] = useState(
      item ? JSON.parse(item) : fallback
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
    onSuccess: () => {
      alert("User successfully created");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const updateUser = useMutation({
    mutationFn: async (user) => {
      const response = await fetch(`${API_URL}/api/v1/users/${user._uuid}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      alert("User successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (user) => {
      const response = await fetch(`${API_URL}/api/v1/users/${user._uuid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      alert("User successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
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
        curUser,
        setCurUser,
        updateUser,
        deleteUser,
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
