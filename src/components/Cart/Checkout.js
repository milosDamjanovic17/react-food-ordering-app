import { useRef, useState } from 'react';

import styles from './Checkout.module.css';


const isEmpty = value => value.trim() === '';


const isFiveChars = value => value.trim().length === 5;



const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // stire entered data to constant
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;


    // check validity of entered data
    const enteredNameIsValid = !isEmpty(enteredName);
    const eneteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    // update the state
    setFormInputsValidity({
        name: enteredNameIsValid,
        street: eneteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid
    });

    // check if form is valid
    const formIsValid = 
        eneteredStreetIsValid 
        && enteredNameIsValid 
        && enteredCityIsValid 
        && enteredPostalCodeIsValid;

    // exit function if some fields are invalid    
    if(!formIsValid){
        console.log('POPUNI SVE');
        return;
    }    

    // if everything is fine, send user data object to Cart.onConfirm
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity
    });
  };

  const nameControlClasses = 
    `${styles.control} ${formInputsValidity.name ? "" : styles.invalid}`;

  const streetControlClasses =
  `${styles.control} ${formInputsValidity.street ? "" : styles.invalid}`;

  const postalCodeControlClasses = 
    `${styles.control} ${formInputsValidity.postalCode ? "" : styles.invalid}`;

  const cityControlClasses = 
  `${styles.control} ${formInputsValidity.city ? "" : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please enter valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Please enter Postal Code (exactly 5 characters)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;