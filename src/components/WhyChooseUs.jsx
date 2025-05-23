import React from 'react';

const WhyChooseUs = () => (
  <section className="container mt-5">
    <h2 className="section-title">WHY CHOOSE US?</h2>
    <div className="accordion" id="whyChooseUs">
      <div className="accordion-item rounded-3">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true">
            Trusted Experience & Excellent Hospitality
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show">
          <div className="accordion-body">
            We have years of experience providing top-class services for all guests with personalized packages.
          </div>
        </div>
      </div>
      <div className="accordion-item rounded-3">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
            Beautiful Locations & Luxurious Villas
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse">
          <div className="accordion-body">
            Our villas are located in the heart of Bali’s most scenic areas, with infinity pools, full-service kitchens, and premium facilities.
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
