import React from 'react';
import styles from '../modules/component-modules/moviecontent-comp.module.css';

export default function MovieContent() {

    return (
        <div className={styles.content}>
            <div className={styles.background}>
                <div className={styles.left}></div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.contentContainer}>Content</div>
        </div>
    )
}