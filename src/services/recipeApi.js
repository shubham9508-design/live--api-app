import axios from 'axios';

export async function searchMealsByName(mealName, apiKey) {
  const normalizedMealName = mealName?.trim();
  const normalizedApiKey = apiKey?.trim();

  if (!normalizedMealName) {
    throw new Error('Please enter a meal name.');
  }

  if (!normalizedApiKey) {
    throw new Error('MealDB API key is missing. Set REACT_APP_MEALDB_API_KEY.');
  }

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/${normalizedApiKey}/search.php`, {
      params: {
        s: normalizedMealName
      }
    });

    const meals = response.data?.meals || [];

    if (!meals.length) {
      throw new Error('No recipes found for this search.');
    }

    return meals.slice(0, 6);
  } catch (error) {
    if (error.message === 'No recipes found for this search.') {
      throw error;
    }

    if (error.response || error.request) {
      throw new Error('Unable to fetch recipes right now. Please try again.');
    }

    throw new Error(error.message || 'Something went wrong while fetching recipes.');
  }
}