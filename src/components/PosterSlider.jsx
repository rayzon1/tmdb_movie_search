import React from 'react';
import styles from '../modules/component-modules/posterslider-comp.module.css';

export default function PosterSlider() {

    return (
        <div className={styles.container}>
            <div className={styles.item}>1</div>
            <div className={styles.item}>2</div>
            <div className={styles.item}>3</div>
            <div className={styles.item}>4</div>
            <div className={styles.item}>5</div>
        </div>
    )
}