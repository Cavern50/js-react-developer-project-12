import './Header.style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import logo from 'assets/pictures/headerLogo.png';

export const Header = () => {
    return (
        <header className='headerWrapper'>
            <Link to={ROUTES.MAIN.path}>
                <img src={logo} className='headerLogo'/>
            </Link>
        </header>
    )
}