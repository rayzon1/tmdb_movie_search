import React from 'react';
import styles from '../modules/container-modules/signin-container.module.css'
import LogIn from '../components/LogIn';

export default function SignIn() {


    return (
        <div className={styles.bg}>
            <div style={{alignSelf: 'center', justifySelf: 'center'}}><LogIn /></div>
        </div>
        
    )
}