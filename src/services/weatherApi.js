import axios from 'axios';

const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchCurrentWeather(city, apiKey) {
  const normalizedCity = city?.trim();
  const normalizedApiKey = apiKey?.trim();

  if (!normalizedCity) {
    throw new Error('Please enter a city name.');
  }

  if (!normalizedApiKey) {
    throw new Error('OpenWeather API key is missing. Set REACT_APP_OPENWEATHER_API_KEY.');
  }

  try {
    const response = await axios.get(OPEN_WEATHER_URL, {
      params: {
        q: normalizedCity,
        appid: normalizedApiKey,
        units: 'metric'
      }
    });

    const weatherItem = response.data.weather?.[0] || {};

    return {
      city: response.data.name,
      temperature: Number(response.data.main.temp.toFixed(1)),
      humidity: response.data.main.humidity,
      condition: weatherItem.description || 'Not available',
      iconCode: weatherItem.icon || ''
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found. Please enter a valid city name.');
    }

    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please verify your OpenWeather API key.');
    }

    throw new Error('Unable to fetch weather data right now. Please try again.');
  }
}