import React, { useContext, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginwithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!){
      register(uid: $uid, name: $name){
        uid
        name
        }
      }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("register", { data });
  };

  if(localStorage.getItem('accessToken')){
    return <Navigate to="/"/>
  }
  
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to note app
      </Typography>
      <Button variant="outlined" onClick={handleLoginwithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
