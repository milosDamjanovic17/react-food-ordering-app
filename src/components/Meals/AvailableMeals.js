import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

  // useState for managing meals collection
  const [meals, setMeals] = useState([]);

  // FETCH DATA FROM FIREBASE DB
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-food-ordering-app-6950c-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
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
    };

    fetchMeals();
  }, []);

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
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
