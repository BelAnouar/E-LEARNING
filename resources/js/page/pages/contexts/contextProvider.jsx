import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
})

export const ContextProvider = ({children}) => {
  // Initialize user from localStorage
  const [user, _setUser] = useState(() => {
    const savedUser = localStorage.getItem('USER_DATA');
    return savedUser ? JSON.parse(savedUser) : {};
  });
  
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      console.log(token);
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_ROLE'); 
      localStorage.removeItem('USER_DATA'); // Clear user data when token is removed
    }
  }

  const setUser = (userData) => {
    _setUser(userData);  
    console.log("Setting user data:", userData);
    
    if (userData && Object.keys(userData).length > 0) {
      // Store complete user data in localStorage
      localStorage.setItem('USER_DATA', JSON.stringify(userData));
      
      // Also store role separately for backward compatibility
      if (userData.role) {
        localStorage.setItem('USER_ROLE', userData.role);
      }
    } else {
      // Clear user data if userData is empty
      localStorage.removeItem('USER_DATA');
      localStorage.removeItem('USER_ROLE');
    }
  }

  const setNotification = message => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  const isAdmin = () => {
    return user.role === 'admin' || localStorage.getItem('USER_ROLE') === 'admin';
  }

  const getUserRole = () => {
    return user.role || localStorage.getItem('USER_ROLE') || 'user';
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,
      isAdmin,
      getUserRole
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);