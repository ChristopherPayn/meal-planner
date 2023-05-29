import { useState, useEffect } from 'react';
import { mockMeals } from './mock-data';
import './App.css';

const Meal = ({ meal }) => {
  return (
    <div className='meal'>
      <span className='meal__name'>{meal.name}</span>
      <span className='meal__quantity'>{meal.quantity}</span>
    </div>
  );
};

const MealList = ({ meals }) => {
  return (
    <div className='meal-list'>
      <span>Meal List</span>
      {meals.map(meal => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </div>
  )
};

const MealTime = ({ mealTime, meals, handleMealSelected }) => {
  let currentMeal = '';
  const handleSelectChange = (event) => {
    const { value: newMeal } = event.target;
    handleMealSelected(currentMeal, newMeal);
  };

  const handleFocus = (event) => {
    console.log('FOCUS:', event.target.value);
    currentMeal = event.target.value;
  };

  return (
    <div className='meal-time'>
      {mealTime}
      <select onFocus={handleFocus} onChange={handleSelectChange}>
        <option>Select...</option>
        {meals.map(meal => {
          console.log('MAP RUN');
          if(meal.quantity > 0) {
            return <option key={meal.id}>{meal.name}</option>
          }
        })}
      </select>
    </div>
  );
};

const Day = ({ date, meals, handleMealSelected }) => {
  return (
    <div className='day'>
      <div>{date}</div>
      <div className='meal-times'>
        <MealTime mealTime='Breakfast' meals={meals} handleMealSelected={handleMealSelected} />
        <MealTime mealTime='Lunch' meals={meals} handleMealSelected={handleMealSelected} />
        <MealTime mealTime='Dinner' meals={meals} handleMealSelected={handleMealSelected} />
      </div>
    </div>
  );
};

const App = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    setMeals(mockMeals);
  }, []);

  const handleMealSelected = (previousMeal, selectedMeal) => {
    const newMeals = meals.map((meal) => {
      if (meal.name === previousMeal) {
        console.log('PREVIOUS MEAL:', meal)
        return {
          ...meal,
          quantity: meal.quantity + 1,
        };
      };
      if (meal.name === selectedMeal) {
        console.log('SELECTED MEAL:', meal)
        return {
          ...meal,
          quantity: meal.quantity - 1,
        };
      };
      return meal;
    });
    console.log({ newMeals });
    setMeals(newMeals);
  };

  return (
    <div>
      App
      <MealList meals={meals} />
      <Day date={'Monday'} meals={meals} handleMealSelected={handleMealSelected} />
    </div>
  );
};

export default App;
