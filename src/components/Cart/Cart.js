import React, { useContext,useState } from "react";
import styles from "./Cart.module.css"
import CartItem from './CartItem'
import Modal from "../UI/Modal/Modal";
import Checkout from "./Checkout";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
    const [isOrdering, setIsOrdering] = useState(false)
    const cartContext = useContext(CartContext)

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`
    const cartIsEmpty = !cartContext.items.length > 0

    const cartItemAddHandler = (item) => {
        cartContext.addItem({...item,amount:1})
    }

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id)
    }

    const orderHandler = ()=>{
        setIsOrdering(true)
    }

    const cartItems = <ul className={styles['cart-items']}>{
        cartContext.items.map((element) => {
            return <CartItem
                key={element.id}
                name={element.name}
                amount={element.amount}
                price={element.price}
                onAdd={cartItemAddHandler.bind(null, element)}
                onRemove={cartItemRemoveHandler.bind(null, element.id)} />
        })}
    </ul>

    return <Modal onClose={props.onClose}>
        {!isOrdering && cartItems}
        <div className={styles.total}>
            <span> Total Amount </span>
            <span> {totalAmount} </span>
        </div>
       {isOrdering &&  <Checkout onClose ={props.onClose}/>}
        <div className={styles.actions}>
           {!isOrdering && <button className={styles['button--alt']} onClick={props.onClose}> Close </button>}
            {!isOrdering && !cartIsEmpty && <button className={styles.button} onClick = {orderHandler}> Order </button>}
        </div>
    </Modal>
}

export default Cart