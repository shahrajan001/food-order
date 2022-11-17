import React, { useRef, useState } from "react";
import styles from './Checkout.module.css'

const isEmpty = (value) => value.trim() === ''
const isNotSixChars = (value) => value.length !== 6

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city:true,
        postal:true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = !isEmpty(enteredPostal) && !isNotSixChars(enteredPostal)
        const enteredCityIsValid = !isEmpty(enteredCity)

        const formIsValid = (enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid)

        setFormInputValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postal :enteredPostalIsValid,
            city:enteredCityIsValid
        })

        if (!formIsValid) {
            return
        }
            // submit form
    }

    const nameControlClasses = `${styles.control} ${formInputValidity.name ? '': styles.invalid}`
    const streetControlClasses = `${styles.control} ${formInputValidity.street ? '': styles.invalid}`
    const postalControlClasses = `${styles.control} ${formInputValidity.postal ? '': styles.invalid}`
    const cityControlClasses = `${styles.control} ${formInputValidity.city ? '': styles.invalid}`
    return (<form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor="name"> Your name </label>
            <input type="text" id="name" ref={nameInputRef}></input>
            {!formInputValidity.name && <p> Please enter a valid name.</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor="street"> Street </label>
            <input type="text" id="street" ref={streetInputRef} ></input>
            {!formInputValidity.street && <p> Please enter a valid Street.</p>}
        </div>
        <div className={postalControlClasses}>
            <label htmlFor="postal"> Postal Code </label>
            <input type="number" id="postal" ref={postalInputRef}></input>
            {!formInputValidity.postal && <p> Please enter a valid postal code.</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor="city"> City </label>
            <input type="text" id="city" ref={cityInputRef}></input>
            {!formInputValidity.city && <p> Please enter a valid city.</p>}
        </div>
        <div className={styles.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={styles.submit}>Confirm</button>
        </div>
    </form>
    );
};

export default Checkout;