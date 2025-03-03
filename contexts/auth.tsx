import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, useSegments } from "expo-router";

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      // Simulating an authentication check
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fakeUser = { id: 1, name: "Eric" }; // Set this to an object to simulate login
      setUser(fakeUser);
      setLoading(false);

      // If no user, redirect to login
      if (!fakeUser && segments[0] !== "login") {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  const login = () => {};

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
