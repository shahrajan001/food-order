import React from "react";
import styles from './MealsSummary.module.css'

const MealsSummary = ()=>{
    return (
        <section className={styles.summary}>
          <h2>Delicious Food, Delivered To You</h2>
          <p>
            Order your favorite meal for a delicious lunch or dinner and enjoy at your home.
          </p>
          <p>
            All our meals are cooked with high-quality ingredients and by our experienced chefs!
          </p>
        </section>
      );
}

export default MealsSummary