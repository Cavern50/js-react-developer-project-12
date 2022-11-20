import React from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = React.createContext({});

const auth = JSON.parse(window.localStorage.getItem('auth'));

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!auth) return navigate('/login');
    }, []);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => React.useContext(AuthContext);