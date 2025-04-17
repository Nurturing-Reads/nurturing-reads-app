import React, {useState, useContext, createContext, PropsWithChildren, } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

// Todo: Update context type for backend
const AuthContext = createContext<AuthContextType>({
  signIn :() => null,
  signOut: () => null,
  session: null,
  isLoading: false
});


export const useSession = () => {
  // Get value from AuthContext
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production'){
    if (!value){
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
};


/* 
Todo: Add the following functionalities for firebase:
1. Sign-up
2. Login
3. Logout 
4. Handle Authentication Change
*/
export const SessionProvider = ({children}: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState('session');
  // 1. Placeholder for sign-in
  const signIn = () => {
    setSession('xxx');
  };
  
  // 2. Placeholder for sign-out 
  const signOut = () => {
    setSession(null);
  };

  
  return (
    <AuthContext.Provider value={{
      signIn: signIn,
      signOut: signOut,
      session, isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
 
