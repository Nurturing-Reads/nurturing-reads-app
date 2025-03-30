import React, { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser){
        setUser(authUser);
        setLoading(false);
        setName(authUser.displayName)
      } else {
        setUser(null);
        setName(null);
      }
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    if (userCredential.user && !userCredential.user.emailVerified) {
      await sendEmailVerification(userCredential.user);
      console.log("Verification Email Sent");
    }

    return userCredential;
  };

  const checkEmailVerification = async () => {
    await auth.currentUser?.reload();
    return auth.currentUser?.emailVerified;
  }

  return (
    <AuthContext.Provider
        value={{ user, setUser, logout, loading , signup, name, setName, checkEmailVerification }}
    >
      {children}
    </AuthContext.Provider>
  );
};
