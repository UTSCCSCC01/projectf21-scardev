import React from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.css'

/**
 * Landing Page. This is the first page the user sees when connecting to the website
 * if not currently signed in.
 * @returns Landing Page
 */
const Landing = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <h1 className={styles.slogan}>Giving recreational athletes the professional experience.</h1>
            </div>

            <div className={styles.rightContainer}>
                <h1 className={styles.title}>OpenRun</h1>
                <Link to="/signup" className={styles.signUpBtn}>Get Started</Link>
                <h6 className={styles.subText}>Already have an account? <Link to="/login" className={styles.signInLink}>Sign in</Link></h6>
            </div>
        </div>
    )
}

export default Landing