import React, { useEffect, useState, createContext } from "react";
import axios from 'axios';
import { URL, injectAuthorization } from '../api/api.config'
import jwt_decode from 'jwt-decode'

export const Auth = createContext();

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const user_token = localStorage.getItem('user_token')
    if (user_token) {
      const decoded = jwt_decode(user_token);
      setCurrentUser(decoded)
    } else {
      setCurrentUser(null)
    }
    setPending(false)
  }, [])

  const login = async (email, password) => {
    const data = { email, password }
    const response = await axios.post(`${URL}/login`, data)
    const user = response.data;
    localStorage.setItem('user_token', user.token)
    injectAuthorization();
    setCurrentUser(user);
    setPending(false)
  }

  const logout = async () => {
    await axios.post(`${URL}/logout`)
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user_token')
    setCurrentUser(null)
  }

  if (pending) {
    return <>Loading...</>
  }

  return (
    <Auth.Provider value={{
      currentUser,
      login,
      logout
    }}
    >
      {children}
    </Auth.Provider>
  );
};