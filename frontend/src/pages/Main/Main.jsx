import { useNavigate } from "react-router-dom"
import React from 'react';

export const Main = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/login');
    }, []);
    return ( 
        <div>123</div>
    )
}