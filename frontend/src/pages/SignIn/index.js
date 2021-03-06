import { React, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './index.module.css'

/**
 * Sign In Page. This is the page where the user signs into their account.
 * @returns Sign In Page
 */
const SignIn = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            password: password,
		    email: email,
        }

        fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (res.status === 200){
                res.json().then(body => {
                    localStorage.setItem('userToken', body.data)
                    history.push('/feed')
                    return
                })
            }
            
            if (res.status === 401) 
                setError("Invalid login, try again.")
            else if (res.statuse !== 200)
                setError("Login request failed, please try again.") 
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

                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputLong}/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputLong}/>

                {err !== "" && (
                    <div className={styles.signIn}>
                        <h6 style={{color: 'red', fontSize: 12}}>{err}</h6>
                    </div>
                )}
                
                <div className={styles.submitContainer}>
                    <input type="submit" value="Login" className={styles.submit}/>
                </div>

                <div className={styles.signIn}>
                    <h6 className={styles.subText}>Don't have an account? <Link to="/signup" className={styles.signInLink}>Sign Up</Link></h6>
                </div>
            </form>
            </div>
        </div>
    )
}

export default SignIn