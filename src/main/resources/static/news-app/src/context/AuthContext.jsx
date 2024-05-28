import { createContext, useState } from 'react';

const AuthContext = createContext('');

export const AuthProvider = (props) => {
  const [jwt, setJwt] = useState(null);
    // Function to set the JWT token
    const login = (token) => {
      setJwt(token);
    };
  
    // Function to clear the JWT token
    const logout = () => {
      setJwt(null);
    };
  return (
    <AuthContext.Provider value={{ jwt, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;