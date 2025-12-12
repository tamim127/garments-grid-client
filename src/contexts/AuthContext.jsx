import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";

// Create context
const AuthContext = createContext();

// Hook for consuming context
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const register = (email, password, name, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        const currentUser = result.user;
        return updateProfile(currentUser, { displayName: name, photoURL }).then(
          () => {
            setUser({ ...currentUser, displayName: name, photoURL });
          }
        );
      }
    );
  };

  // Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logout = () => signOut(auth);

  // Google Sign-In
  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
