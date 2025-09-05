import React, { useState } from 'react';
import LoginImage from "../../assets/images/login-img.png";
import styles from './LoginPage.module.scss';
import { useLoginMutation } from '../../utils/services/AuthApi';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading, error }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();

            console.log(result);
            if (result?.role === "Admin") {
                navigate('/admin-dashboard');
            } else if (result?.role === "User") {
                navigate('/');
            } //else {
            //("Unauthorized role or missing permissions.");
            //}

        } catch (err) {
            console.error('Login failed:', err);
        }
    };


    return (
        <div className={styles.loginContainer}>
            <div className={styles.leftPane}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h2>Welcome Back!</h2>
                    <p>Login In to your account and join us</p>

                    <label htmlFor="" className={styles.inputLabel}>Email</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="" className={styles.inputLabel}>Password</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className={styles.error}>Login failed. Please try again.</p>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* <div>
                        <span>Don't have an account </span><button type='submit' onClick={() => { navigate('/register') }}> Sign Up </button>
                    </div> */}
                    <div>
                        <span>Don't have an account? </span>
                        <Link to="/register" className={styles.signUpLink}>Sign Up</Link>
                    </div>

                </form>
            </div>

            <div className={styles.rightPane}>
                <img src={LoginImage} alt="login-img" />
            </div>
        </div>
    );
};

export default LoginPage;
