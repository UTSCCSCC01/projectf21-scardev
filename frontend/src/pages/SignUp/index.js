import { React, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './index.module.css'

/**
 * Sign Up Page. This is the page where the user signs up for an account.
 * @returns Sign Up Page
 */
const SignUp = () => {

    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            first_name: firstName,
            last_name: lastName,
            password: password,
		    email: email,
		    phone: phone
        }

        fetch('http://localhost:5000/signup', {
            method: 'post',
            body: JSON.stringify(payload)
        })
        .then(res => {
            history.push('/home');
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <h1 className={styles.slogan}>Giving recreational athletes the professional experience.</h1>
            </div>

            <div className={styles.rightContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.title}>OpenRun</label>

                <div className={styles.formName}>
                    <div className={styles.firstName}>
                        <label>First Name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    <div>
                        <label>Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>

                <br style={{clear:'both'}} />

                <label>Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.inputLong}/>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputLong}/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputLong}/>

                <div className={styles.submitContainer}>
                    <input type="submit" value="Create Account" className={styles.submit}/>
                </div>

                <div className={styles.signIn}>
                    <h6 className={styles.subText}>Already have an account? <Link to="/login" className={styles.signInLink}>Sign In</Link></h6>
                </div>
            </form>
            </div>
        </div>
    )
}

export default SignUp