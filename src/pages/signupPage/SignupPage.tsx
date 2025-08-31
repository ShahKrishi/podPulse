import React, { useState } from 'react';
import SignupImage from '../../assets/images/login-img.png';
import styles from './SignupPage.module.scss';
import { useRegisterMutation } from '../../utils/services/AuthApi';

const SignUpPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signup, { isLoading }] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await signup({
                firstname: firstName,
                lastname: lastName,
                email,
                password,
            }).unwrap();

            console.log('Signup successful:', result);
            alert('Signup successful!');

        } catch (err: any) {
            console.error('Signup failed:', err);
            alert('Signup failed: ' + (err.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className={styles.signContainer}>
            <div className={styles.leftPane}>
                <form onSubmit={handleSubmit} className={styles.signForm}>
                    <h2>Let's Get Started!</h2>
                    <p>Please enter the following details to get started</p>

                    <label className={styles.inputLabel}>First Name</label>
                    <input
                        type="text"
                        placeholder="Eg: John"
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label className={styles.inputLabel}>Last Name</label>
                    <input
                        type="text"
                        placeholder="Eg: Doe"
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label className={styles.inputLabel}>Email</label>
                    <input
                        type="email"
                        placeholder="Eg: johndoe@gmail.com"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className={styles.inputLabel}>Password</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>

            <div className={styles.rightPane}>
                <img src={SignupImage} alt="signup-img" />
            </div>
        </div>
    );
};

export default SignUpPage;
