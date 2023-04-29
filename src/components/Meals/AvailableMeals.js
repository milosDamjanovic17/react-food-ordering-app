import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';


const AvailableMeals = () => {

  // useState for managing meals collection
  const [meals, setMeals] = useState([]);
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  // error state
  const [httpError, setHttpError] = useState();

  // FETCH DATA FROM FIREBASE DB, need to bypass and nest a function since we'll use async and await
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-food-ordering-app-6950c-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
      
      // check if fetching process failed
      if(!response.ok){
        throw new Error('Something went wrong!');
      };
      
      const responseData = await response.json(); // return collection as JSON

      const loadedMeals = [];

      // loop through responseData, map fields accordingly and populate loaded meals array
      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      // update the state
      setMeals(loadedMeals);
      setIsLoading(false);
    };


      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  // pokazi loading msg dok app povlaci meals iz firebase
  if(isLoading){
    return(
      <section className={styles.MealsLoading}>
        <p>Loading</p>
      </section>
    )
  }

  // check if there are any errors
  if(httpError){
    return(
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
