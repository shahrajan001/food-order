import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const CartReducer = (state, action) => {
    if (action.type === 'ADD_CART') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex((element) => {
            return element.id === action.item.id
        })
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItem
        let updatedItems
        // const updatedItems = state.items.concat(action.item)
        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }else{
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === 'REMOVE_CART') {

    }
    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(CartReducer, defaultCartState)


    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD_CART', item: item })
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE_CART', id: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider