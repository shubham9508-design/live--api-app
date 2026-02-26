import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productApi';

const USD_TO_INR = 83;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (requestError) {
        setProduct(null);
        setError(requestError.message || 'Unable to load product details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const priceInInr = useMemo(() => {
    if (!product) {
      return '';
    }

    return `₹${Math.round(Number(product.price) * USD_TO_INR)}`;
  }, [product]);

  return (
    <section className="content-card">
      <div className="container px-0">
        <div className="mb-3">
          <Link to="/products" className="btn btn-outline-primary">
            Back to Products
          </Link>
        </div>

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mb-0">Loading product details...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        )}

        {!isLoading && !error && product && (
          <div className="card">
            <div className="card-body">
              <div className="row g-4 align-items-start">
                <div className="col-12 col-md-5">
                  <div className="bg-light border rounded d-flex align-items-center justify-content-center p-4" style={{ minHeight: '320px' }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-fluid"
                      style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-7">
                  <p className="small text-uppercase text-muted mb-2">{product.category}</p>
                  <h1 className="h4 mb-3">{product.title}</h1>
                  <p className="h3 mb-3">{priceInInr}</p>
                  <p className="mb-0">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
