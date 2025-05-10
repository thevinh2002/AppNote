import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);


    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) => {
            console.log('[From AuthProvider]', { user });
            if (user?.uid) {
                setUser(user);
                if(user.accessToken !== localStorage.getItem("accessToken")){
                    window.location.reload();
                }
                localStorage.setItem("accessToken", user.accessToken);
                setIsLoading(false);
                return;
            } else {
                setUser(null);
                setIsLoading(false);
                localStorage.clear();
                navigate("/login");
            }
        });
    
        return () => {
            unsubscribe();
        };
    }, [auth, navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    )
}
