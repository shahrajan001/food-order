import React,{useContext} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from './../../store/cart-context'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = (props)=>{
    const cartContext = useContext(CartContext)
    const numberOfCartItems = cartContext.items.reduce((current,item)=>
    { return current + item.Amount},0)

    return <button className={styles.button} onClick={props.onClick}>
        <span className={styles.icon}> 
            <CartIcon/>
        </span>
        <span> Your Cart </span>
        <span className={styles.badge}> {numberOfCartItems} </span>          
    </button>
}

export default HeaderCartButton