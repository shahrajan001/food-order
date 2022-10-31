import React from "react";
import styles from "./Cart.module.css"
import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
    const cartItems = <ul className={styles['cart-items']}>{
        [{
            id: 'm2',
            name: 'Schnitzel',
            description: 'A german specialty!',
            price: 16.5,
        }].map((element) => {
            return <li key = {element.id}>
                {element.name}
            </li>
        })}
    </ul>

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={styles.total}>
        <span> Total Amount </span>
        <span> 37 </span>  
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick = {props.onClose}> Close </button>
            <button className={styles.button}> Order </button>
        </div>
    </Modal>
}

export default Cart