import React, { useContext, useState } from "react";
import axios from "axios";
import styles from "./Cart.module.css"
import CartItem from './CartItem'
import Modal from "../UI/Modal/Modal";
import Checkout from "./Checkout";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
    const [isOrdering, setIsOrdering] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartContext = useContext(CartContext)

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`
    const cartIsEmpty = !cartContext.items.length > 0

    const cartItemAddHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 })
    }

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id)
    }

    const orderHandler = () => {
        setIsOrdering(true)
    }

    const submitOrderHandler = async (userData)=>{
        setIsSubmitting(true)
            var config = {
              method: 'post',
              url: 'https://food-order-b13ba-default-rtdb.firebaseio.com/orders.json',
              data: JSON.stringify({
                user:userData,
                orderedItems:cartContext.items}),
              headers:{'content-type': 'application/json'}
            };
            
            axios(config)
            .then(function (response) {
            //   console.log(JSON.stringify(response.data));
              setDidSubmit(true)
            })
            .catch(function (error) {
                console.log(error);
            });    
            setIsSubmitting(false)
            cartContext.clearCart()
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

    const cartModalContent = <React.Fragment>
        {!isOrdering && cartItems}
        <div className={styles.total}>
            <span> Total Amount </span>
            <span> {totalAmount} </span>
        </div>
        {isOrdering && <Checkout onClose={props.onClose} onConfirm={submitOrderHandler} />}
        <div className={styles.actions}>
            {!isOrdering && <button className={styles['button--alt']} onClick={props.onClose}> Close </button>}
            {!isOrdering && !cartIsEmpty && <button className={styles.button} onClick={orderHandler}> Order </button>}
        </div>
    </React.Fragment>

    const isSubmittingModalContent = <p> Sending order Data</p>
    const didSubmitModalContent = <p> Your order will be delivered in next 30 minutes.</p>

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
}

export default Cart