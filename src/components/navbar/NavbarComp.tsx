import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavbarComp.module.scss';
import Logo from '../../assets/images/logo.png'
import CustomButton from '../button/CustomButton';

const NavbarComp: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src={Logo} alt="" className={styles.logo} />
            </div>

            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
                <CustomButton backgroundColor='#02C7AD' fontColor='#fff'>Login</CustomButton>
            </div>
        </nav>
    );
};

export default NavbarComp;
