import React from 'react';
import styles from '../modules/component-modules/searchbar-comp.module.css';

export default function SearchBar() {


    return (
        <div className={styles.flexbox}>
            <div className={styles.search}>
                <div>
                    <input type="text" placeholder="       Search . . ." required />
                </div>
            </div>
        </div>
    )
}