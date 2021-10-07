import React from 'react'

import { Image } from 'react-bootstrap'

import backgroundImage from '../../assets/landingPageBasketball.png'
import styles from './index.module.css'

/**
 * Landing Page. This is the first page the user sees when connecting to the website
 * if not currently signed in.
 * @returns Landing Page
 */
const Landing = () => {
    return (
        <div className={styles.container}>
            <Image className={styles.image} src={backgroundImage}/>
            <div className={styles.rightContainer}>
                <h1 className={styles.title}>OpenRun</h1>
                <button className={styles.signUpBtn}>Sign Up</button>
                <button className={styles.signUpGoogleBtn}>Sign up with Google</button>
                <h6 className={styles.subText}>Already have an account? <a className={styles.link} href="#">Sign in</a></h6>
            </div>
        </div>
    )
}

export default Landing