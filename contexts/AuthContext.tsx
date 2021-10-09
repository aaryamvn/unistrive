import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { createUser } from "../firestore/users/createUser";
import { UserEntity } from "../entities/UserEntity";
import { findUserById } from "../firestore/users/findUserById";
import { useRouter } from "next/router";

export const AuthContext = createContext(null);

interface AuthContextType {
  login: () => any;
  logout: () => any;
  user: UserEntity;
  error: string;
  isLoading: boolean;
}

export const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<UserEntity>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function login() {
    setIsLoading(true);

    try {
      const provider = new auth.GoogleAuthProvider();
      const res = await auth().signInWithPopup(provider);

      if (res.additionalUserInfo.isNewUser) {
        // create corresponding user in our database
        await createUser({
          id: res.user.uid,
          displayName: res.user.displayName,
          email: res.user.email,
          username:
            res.additionalUserInfo.username || res.user.email.split("@")[0],
          avatarUrl: res.user.photoURL,
          accountType: "highschooler",
        });
      }

      setIsLoading(false);
      setError("");

      console.log("Login Successful");
    } catch (e) {
      console.error(e);
      setError(e.message);
    }

    setIsLoading(false);
    setError("");

    console.log("Login Successful");
    return router.push("/");
  }

  async function logout() {
    try {
      await auth().signOut();
      setUser(null);

      console.log("Logout Successful");
      return router.push("/login");
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (returnedUser) => {
      if (returnedUser) {
        try {
          // fetch custom user using returnedUser.uid and set the user state to that
          const user = await findUserById(returnedUser.uid);
          return setUser(user);
        } catch (e) {
          console.error(e);
          setError(e.message);
        }
      }

      return setUser(null);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
