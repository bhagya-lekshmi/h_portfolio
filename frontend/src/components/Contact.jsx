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
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setResponseMessage('Please correct the errors in the form.');
      return;
    }

    setLoading(true);
    setResponseMessage('');

    try {
      const doc = {
        _type: 'contact',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      };

      await client.create(doc);
      setResponseMessage('Success! Your message has been submitted.');
      setLoading(false);
      setSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setResponseMessage('Failed to submit the form. Please try again.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setResponseMessage('');
    setErrors({});
  };

  if (submitted) {
    return (
      <div id="contact" className="section db">
        <div className="container">
          <h3>Thank you! Your message has been sent.</h3>
          <button className="sim-btn btn-hover-new" onClick={handleReset}>
            Submit Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="contact" className="section db full-height">
      <div className="container">
        <div className="section-title text-left">
          <h3>Contact</h3>
          {/* <p>Get in touch with us using the form below.</p> */}
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="contact_form">
              {responseMessage && (
                <div
                  id="message"
                  style={{
                    marginBottom: '15px',
                    color: responseMessage.includes('Success') ? 'green' : 'red',
                  }}
                >
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
                      {errors.name && <p className="help-block text-danger">{errors.name}</p>}
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
                      {errors.email && <p className="help-block text-danger">{errors.email}</p>}
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
                      {errors.phone && <p className="help-block text-danger">{errors.phone}</p>}
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
                      {errors.message && <p className="help-block text-danger">{errors.message}</p>}
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-lg-12 text-center">
                    <button
                      id="sendMessageButton"
                      className="sim-btn btn-hover-new"
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