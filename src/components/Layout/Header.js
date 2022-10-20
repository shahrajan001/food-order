import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from './../../assets/mealsImage.jpg'
import styles from './Header.module.css'

const Header = () => {
    return (<React.Fragment>
        <header className={styles.header}>
            <h1> Shahen Shah's Kitchen</h1>
            <HeaderCartButton />
        </header>
        <div className={styles["main-image"]}>
            <img src={mealsImage} alt="Welcome to our cafe" />
        </div>
    </React.Fragment>
    )
}

export default Header