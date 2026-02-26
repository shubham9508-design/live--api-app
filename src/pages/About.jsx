function About() {
  return (
    <section className="content-card">
      <div className="container px-0">
        <h1 className="h3 mb-3">About This Project</h1>
        <p className="mb-4">
          Live API App is a student-built React project focused on practical API
          integration. It combines weather insights and e-commerce product data in
          a single interface while maintaining organized component structure,
          readable code, and responsive design.
        </p>

        <h2 className="h5 mb-3">Technologies Used</h2>
        <div className="row g-2">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6 mb-1">React</h3>
                <p className="mb-0 small">Component-based UI development</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6 mb-1">React Router DOM</h3>
                <p className="mb-0 small">Client-side routing and dynamic pages</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6 mb-1">Axios</h3>
                <p className="mb-0 small">HTTP requests for live API data</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6 mb-1">Bootstrap</h3>
                <p className="mb-0 small">Responsive layout and visual consistency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;