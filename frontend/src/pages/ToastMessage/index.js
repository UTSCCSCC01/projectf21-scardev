import React from 'react'
import { Toast } from 'react-bootstrap'

import styles from './index.module.css'

const ToastMessage = ({show, toggle, gameID}) => {
    return (
        <Toast show={show} onClose={toggle} className={styles.toast}>
            <Toast.Header>
                <strong className="me-auto">Notification</strong>
                <small>few seconds ago</small>
            </Toast.Header>
            <Toast.Body>Approved Game {gameID}</Toast.Body>
        </Toast>
    )
}

export default ToastMessage