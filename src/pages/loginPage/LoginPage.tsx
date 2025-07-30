import React, { useState } from 'react';
import LoginImage from "../../assets/images/login-img.png";
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
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
                    <button type="submit">Login</button>
                </form>
            </div>

            <div className={styles.rightPane}>
                <img src={LoginImage} alt="login-img" />
            </div>
        </div>
    );
};

export default LoginPage;
