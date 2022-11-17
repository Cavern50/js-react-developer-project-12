import gitLogo from 'assets/pictures/gitLogo.svg';
import './Footer.style.css';

export const Footer = () => {
    return (
        <footer className='footer'>
            <a className='footerLink' target='_blank' href='https://github.com/cavern50'><img className='footerLogo' src={gitLogo} alt='git'/> <span className='footerText'>https://github.com/cavern50</span></a>
        </footer>
    )
}