import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./initFirebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  reload,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);

  // ____________________ initial steps ____________________
  useEffect(() => {
    console.log("AuthProvider:  _ _ _ initializing user");
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);
  async function initializeUser(user) {
    if (user) {
      setFirebaseUser(user);
      console.log("AuthProvider:  _ _ _ user is available ,", user);
      setCurrentUser({
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
      });
    } else {
      console.log("AuthProvider:  _ _ _ user is not available ");
      setFirebaseUser(null);
      setCurrentUser(null);
    }
    setLoading(false);
  }

  // ____________________ Auth functions ____________________
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function logout() {
    return signOut(auth);
  }
  async function sendVerificationEmail() {
    try {
      if (auth.currentUser) {
        // Use auth.currentUser
        await sendEmailVerification(auth.currentUser);
      }
    } catch (error) {
      throw error;
    }
  }
  async function reloadUser() {
    if (firebaseUser) {
      await reload(firebaseUser);
      setCurrentUser({
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        uid: firebaseUser.uid,
      });
    }
  }

  // _______________ return steps_______________
  const value = {
    currentUser,
    setCurrentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    sendVerificationEmail,
    reloadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
