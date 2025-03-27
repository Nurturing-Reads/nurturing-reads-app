import React, { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
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
    return userCredential;
  };

  return (
    <AuthContext.Provider value={
      { user, setUser, logout, loading , signup, name, setName}
      }>
      {children}
    </AuthContext.Provider>
  );
};
