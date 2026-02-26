function Home() {
  return (
    <section className="content-card">
      <div className="container px-0">
        <h1 className="h2 mb-3">Live API App</h1>
        <p className="mb-4">
          This project demonstrates how a React application can integrate multiple
          live APIs with clean routing, reusable services, and a simple Bootstrap
          interface suitable for academic submission.
        </p>

        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5 mb-2">OpenWeather API Integration</h2>
                <p className="mb-0">
                  The Products page includes a live weather lookup that shows
                  temperature, humidity, condition, and icon data for any city
                  entered by the user.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5 mb-2">Fake Store API Integration</h2>
                <p className="mb-0">
                  The same page also fetches real product data, supports search,
                  shows INR-converted pricing, and provides dynamic details pages
                  for each product.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5 mb-2">TheMealDB API Integration</h2>
                <p className="mb-0">
                  The Products page also includes a live recipe search using
                  TheMealDB API, showing meal names, categories, images, and quick
                  links to full recipe instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;