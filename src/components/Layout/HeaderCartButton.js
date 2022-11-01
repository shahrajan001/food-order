import React,{useContext,useEffect,useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from './../../store/cart-context'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = (props)=>{
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartContext = useContext(CartContext)
    const numberOfCartItems = cartContext.items.reduce((current,item)=>
    { return current + item.amount},0)

    const { items } = cartContext;

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

    useEffect(() => {
      if (items.length === 0) {
        return;
      }
      setBtnIsHighlighted(true);
  
      const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
      }, 300);
  
      return () => {
        clearTimeout(timer);
      };
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}> 
            <CartIcon/>
        </span>
        <span> Your Cart </span>
        <span className={styles.badge}> {numberOfCartItems} </span>          
    </button>
}

export default HeaderCartButton