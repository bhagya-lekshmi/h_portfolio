import React, { useState } from 'react';
import { client } from '../client';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Update form data on input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResponseMessage('');

  try {
    const doc = {
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    await client.create(doc);
    setResponseMessage('Success! Your message has been submitted.');
    setLoading(false);
    setSubmitted(true);
  } catch (error) {
    console.error(error);
    setResponseMessage('There was an error submitting the form.');
    setLoading(false);
  }
};


  if (submitted) {
    return (
      <div id="contact" className="section db">
        <div className="container">
          <h3>Thank you! Your message has been sent.</h3>
        </div>
      </div>
    );
  }

  return (
    <div id="contact" className="section db">
      <div className="container">
        <div className="section-title text-left">
          <h3>Contact</h3>
          <p>
          </p>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="contact_form">
              {responseMessage && (
                <div id="message" style={{ marginBottom: '15px' }}>
                  {responseMessage}
                </div>
              )}

              <form id="contactForm" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="phone"
                        type="tel"
                        placeholder="Your Phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder="Your Message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-lg-12 text-center">
                    <div id="success"></div>
                    <button
                      id="sendMessageButton"
                      className="sim-btn btn-hover-new"
                      data-text="Send Message"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
