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

// Auth Context
const AuthContext = createContext();

// Hook
export const useAuth = () => useContext(AuthContext);

// Provider
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Email & Password Register
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
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    // Logout
    const logout = () => signOut(auth);

    // Google Sign-In
    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Auth State Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = { user, loading, register, login, logout, loginWithGoogle };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
