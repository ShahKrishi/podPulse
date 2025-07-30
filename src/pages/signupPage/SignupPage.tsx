import React, { useState } from 'react';
import SignupImage from '../../assets/images/login-img.png';
import styles from './SignupPage.module.scss';

const SignUpPage: React.FC = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ firstName, lastName, email, password });
    };

    return (
        <div className={styles.signContainer}>
            <div className={styles.leftPane}>
                <form onSubmit={handleSubmit} className={styles.signForm}>
                    <h2>Let's Get Started!</h2>
                    <p>Please enter the following details to get started</p>

                    <label htmlFor="" className={styles.inputLabel}>First Name</label>
                    <input
                        type="text"
                        placeholder="Eg: John"
                        value={firstName}
                        required
                        onChange={(e) => setfirstName(e.target.value)}
                    />

                    <label htmlFor="" className={styles.inputLabel}>Last Name</label>
                    <input
                        type="text"
                        placeholder="Eg: Doe"
                        value={lastName}
                        required
                        onChange={(e) => setlastName(e.target.value)}
                    />

                    <label htmlFor="" className={styles.inputLabel}>Email</label>
                    <input
                        type="email"
                        placeholder="Eg: johndoe@gmail.com"
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className={styles.rightPane}>
                <img src={SignupImage} alt="signup-img" />
            </div>
        </div>
    );
};

export default SignUpPage;
