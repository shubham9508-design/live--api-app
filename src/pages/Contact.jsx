function Contact() {
  return (
    <section className="content-card">
      <div className="container px-0">
        <h1 className="h3 mb-2">Contact</h1>
        <p className="mb-4">
          Have feedback on this project or want to discuss the API integration approach? Send a message below.
        </p>

        <form className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input id="name" type="text" className="form-control" />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input id="email" type="email" className="form-control" />
          </div>
          <div className="col-12">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea id="message" rows="5" className="form-control" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;