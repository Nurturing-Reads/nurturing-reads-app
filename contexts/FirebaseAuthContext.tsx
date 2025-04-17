import React from "react";
import { useContext, createContext, useEffect, useState, PropsWithChildren } from "react";
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from "./FirebaseConfig";

type AuthContextType = {
  user: User | null;
  username: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: "",
  isLoading: false,
  signIn: async () => { return null; },
  signOut: async () => { }
});

interface AuthProviderProp {
  children: React.ReactNode;
}

export const FirebaseAuthProvider = ({ children }: AuthProviderProp) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      console.log("User signed in: ", currentUser?.email);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      console.log("Sign-in success:", userCred.user.email);
      return userCred.user;
    } catch (error: any) {
      console.error("Firebase sign-in failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const signOut = async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth);
      console.log("Signed out.")
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, username, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )

};

export const useAuth = () => useContext(AuthContext);
