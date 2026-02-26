import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../services/productApi';
import { searchMealsByName } from '../services/recipeApi';
import { fetchCurrentWeather } from '../services/weatherApi';

const DEFAULT_CITY = 'London';
const USD_TO_INR = 83;

function Products() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState('');
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productSearch, setProductSearch] = useState('');
  const [recipeQuery, setRecipeQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipesError, setRecipesError] = useState('');
  const [isRecipesLoading, setIsRecipesLoading] = useState(false);
  const [hasSearchedRecipes, setHasSearchedRecipes] = useState(false);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY || '';
  const mealDbApiKey = process.env.REACT_APP_MEALDB_API_KEY || '1';

  const loadWeather = useCallback(async (targetCity) => {
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchCurrentWeather(targetCity, apiKey);
      setWeather(data);
    } catch (requestError) {
      setWeather(null);
      setError(requestError.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    setCity(DEFAULT_CITY);
    loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsProductsLoading(true);
      setProductsError('');

      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (requestError) {
        setProducts([]);
        setProductsError(requestError.message || 'Unable to load products.');
      } finally {
        setIsProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadWeather(city);
  };

  const handleRecipeSearch = async (event) => {
    event.preventDefault();
    setIsRecipesLoading(true);
    setRecipesError('');
    setHasSearchedRecipes(true);

    try {
      const data = await searchMealsByName(recipeQuery, mealDbApiKey);
      setRecipes(data);
    } catch (requestError) {
      setRecipes([]);
      setRecipesError(requestError.message || 'Unable to load recipes.');
    } finally {
      setIsRecipesLoading(false);
    }
  };

  const iconUrl = weather?.iconCode
    ? `https://openweathermap.org/img/wn/${weather.iconCode}@4x.png`
    : '';

  const filteredProducts = useMemo(() => {
    const keyword = productSearch.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product) => product.title.toLowerCase().includes(keyword));
  }, [products, productSearch]);

  const formatPriceInInr = (priceInUsd) => {
    const convertedPrice = Number(priceInUsd) * USD_TO_INR;
    return `₹${Math.round(convertedPrice)}`;
  };

  return (
    <section className="content-card">
      <div className="container px-0">
        <div className="mb-4">
          <h1 className="h3 mb-2">Live Weather Search</h1>
          <p className="text-muted mb-0">Search current weather using OpenWeather API.</p>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row g-2">
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        Loading
                      </>
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger mt-3 mb-0" role="alert">
                  {error}
                </div>
              )}
            </form>

            <div className="pt-3 border-top">
              {!weather && !isLoading && !error && (
                <div className="text-center py-4 text-muted">
                  <p className="mb-0">Enter a city name and click Search to view live weather data.</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary mb-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mb-0">Fetching latest weather data...</p>
                </div>
              )}

              {weather && !isLoading && (
                <div>
                  <div className="mb-3 text-center">
                    <h2 className="h4 mb-1">{weather.city}</h2>
                    <p className="text-muted text-capitalize mb-0">Current weather overview</p>
                  </div>

                  <div className="mb-3 text-center">
                    <p className="h2 mb-0">{weather.temperature}°C</p>
                    <p className="text-muted mb-0">Temperature</p>
                  </div>

                  <div className="mb-3 text-center">
                    <div className="d-inline-flex align-items-center justify-content-center bg-light p-2 border rounded">
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={weather.condition}
                          width="96"
                          height="96"
                        />
                      )}
                    </div>
                  </div>

                  <div className="row g-3 text-start">
                    <div className="col-12 col-md-4">
                      <div className="bg-light border rounded p-3 h-100">
                        <p className="text-muted small mb-1">Temperature</p>
                        <p className="h5 mb-0">{weather.temperature}°C</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="bg-light border rounded p-3 h-100">
                        <p className="text-muted small mb-1">Humidity</p>
                        <p className="h5 mb-0">{weather.humidity}%</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="bg-light border rounded p-3 h-100">
                        <p className="text-muted small mb-1">Condition</p>
                        <p className="h5 text-capitalize mb-0">{weather.condition}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <div className="row g-3 align-items-center mb-3">
              <div>
                <h2 className="h4 mb-1">E-commerce Product Listing</h2>
                <p className="text-muted mb-0">Browse products from Fake Store API.</p>
              </div>
              <div className="col-12 col-md-6 ms-md-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product title"
                  value={productSearch}
                  onChange={(event) => setProductSearch(event.target.value)}
                />
              </div>
            </div>

            {isProductsLoading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary mb-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mb-0">Loading products...</p>
              </div>
            )}

            {!isProductsLoading && productsError && (
              <div className="alert alert-danger mb-0" role="alert">
                {productsError}
              </div>
            )}

            {!isProductsLoading && !productsError && (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <p className="mb-0">No products match your search.</p>
                  </div>
                ) : (
                  <div className="row g-3 g-md-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                        <div className="card h-100">
                          <div className="bg-light border-bottom d-flex align-items-center justify-content-center p-3" style={{ minHeight: '220px' }}>
                            <img
                              src={product.image}
                              alt={product.title}
                              className="img-fluid"
                              style={{ maxHeight: '180px', objectFit: 'contain' }}
                            />
                          </div>
                          <div className="card-body d-flex flex-column">
                            <p className="small text-uppercase text-muted mb-2">{product.category}</p>
                            <h3 className="h6 mb-3" style={{ minHeight: '3rem' }}>{product.title}</h3>
                            <p className="h5 mt-auto mb-3">{formatPriceInInr(product.price)}</p>
                            <Link to={`/products/${product.id}`} className="btn btn-outline-primary">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <div className="mb-3">
              <h2 className="h4 mb-1">Recipe Search</h2>
              <p className="text-muted mb-0">Search meals using TheMealDB API.</p>
            </div>

            <form onSubmit={handleRecipeSearch} className="mb-4">
              <div className="row g-2">
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by meal name"
                    value={recipeQuery}
                    onChange={(event) => setRecipeQuery(event.target.value)}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <button type="submit" className="btn btn-primary w-100" disabled={isRecipesLoading}>
                    {isRecipesLoading ? 'Loading...' : 'Search Recipes'}
                  </button>
                </div>
              </div>
            </form>

            {isRecipesLoading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary mb-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mb-0">Loading recipes...</p>
              </div>
            )}

            {!isRecipesLoading && recipesError && (
              <div className="alert alert-danger mb-0" role="alert">
                {recipesError}
              </div>
            )}

            {!isRecipesLoading && !recipesError && hasSearchedRecipes && recipes.length === 0 && (
              <div className="text-center py-4 text-muted">
                <p className="mb-0">No recipes found.</p>
              </div>
            )}

            {!isRecipesLoading && !recipesError && recipes.length > 0 && (
              <div className="row g-3">
                {recipes.map((meal) => (
                  <div key={meal.idMeal} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100">
                      <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
                      <div className="card-body d-flex flex-column">
                        <h3 className="h5 mb-2">{meal.strMeal}</h3>
                        <p className="mb-1"><strong>Category:</strong> {meal.strCategory || 'N/A'}</p>
                        <p className="mb-2"><strong>Area:</strong> {meal.strArea || 'N/A'}</p>
                        <p className="text-muted mb-0" style={{ whiteSpace: 'pre-line' }}>
                          {meal.strInstructions || 'Instructions not available.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;