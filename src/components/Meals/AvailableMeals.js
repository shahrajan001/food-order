import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import styles from './AvailableMeals.module.css'
import MealItem from "./MealItem/Mealitem";
import axios from "axios";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            var config = {
                method: 'get',
                url: 'https://food-order-b13ba-default-rtdb.firebaseio.com/meals.json',
                headers: {}
            };
            let loadedMeals = []

            await axios(config)
                .then(function (response) {

                    for (const key in response.data) {
                        loadedMeals.push({
                            id: response.data[key].id,
                            name: response.data[key].name,
                            description: response.data[key].description,
                            price: response.data[key].price,
                        })
                    }
                    setMeals(loadedMeals)
                })
                .catch(function (error) {
                    console.log(error);
                    setHttpError(error.message)
                    throw new Error('Something went wrong')
                })
            setIsLoading(false)
        }
        try {
            fetchMeals()
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }, [])
    if (isLoading) {
        return <section className={styles.mealsLoading}>
            <p> Loading...</p>
        </section>
    }
    if (httpError) {
        return <section className={styles.mealsLoading}>
            <p> {httpError}</p>
        </section>
    }
    const mealsList = meals.map((meal) => {
        return <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    })
    return <section className={styles.meals}>
        <Card >
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>

}

export default AvailableMeals