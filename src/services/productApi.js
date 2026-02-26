import axios from 'axios';

const FAKE_STORE_URL = 'https://fakestoreapi.com/products';

export async function fetchAllProducts() {
  try {
    const response = await axios.get(FAKE_STORE_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response) {
      throw new Error('Unable to load products right now. Please try again shortly.');
    }

    if (error.request) {
      throw new Error('Network error while loading products. Check your internet connection.');
    }

    throw new Error('Something went wrong while loading products.');
  }
}

export async function fetchProductById(productId) {
  try {
    const response = await axios.get(`${FAKE_STORE_URL}/${productId}`);

    if (!response.data || !response.data.id) {
      throw new Error('Product not found.');
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Product not found.');
    }

    if (error.response) {
      throw new Error('Unable to load product details right now. Please try again shortly.');
    }

    if (error.request) {
      throw new Error('Network error while loading product details. Check your internet connection.');
    }

    throw new Error('Something went wrong while loading product details.');
  }
}
