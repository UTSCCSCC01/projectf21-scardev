import React from 'react'

import { Image } from 'react-bootstrap'

import styles from './index.module.css'
import googleIcon from '../../assets/googleIcon.svg'

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
                <button className={styles.signUpBtn}>Sign Up</button>
                <button className={styles.signUpGoogleBtn}>
                    <Image src={googleIcon} className={styles.icon} />
                    Sign up with Google
                </button>
                <h6 className={styles.subText}>Already have an account? <a className={styles.link} href="#">Sign in</a></h6>
            </div>
        </div>
    )
}

export default Landing