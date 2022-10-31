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
            return <li>
                {element.name}
            </li>
        })}
    </ul>

    return <Modal>
        {cartItems}
        <div className={styles.total}>
        <span> Total Amount </span>
        <span> 37 </span>  
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']}> Close </button>
            <button className={styles.button}> Order </button>
        </div>
    </Modal>
}

export default Cart