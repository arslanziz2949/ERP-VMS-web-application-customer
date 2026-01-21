import React, { useState } from 'react';
import { useTheme } from '../Theme/ThemeContext';

const ContactUs = () => {
  const { mode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerStyle = {
    padding: '24px',
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle = {
    marginBottom: '32px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: '0 0 8px 0',
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    margin: 0,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  };

  const contactInfoStyle = {
    background: 'var(--bg-card)',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-color)',
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid var(--border-color)',
    '&:last-child': {
      borderBottom: 'none',
      marginBottom: 0,
      paddingBottom: 0,
    },
  };

  const contactIconStyle = {
    fontSize: '24px',
    marginRight: '16px',
    color: 'var(--primary-color)',
    flexShrink: 0,
  };

  const contactTextStyle = {
    flex: 1,
  };

  const contactTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: '0 0 4px 0',
  };

  const contactDescriptionStyle = {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    margin: '0 0 8px 0',
  };

  const contactDetailStyle = {
    fontSize: '14px',
    color: 'var(--text-primary)',
    fontWeight: '500',
    margin: 0,
  };

  const formStyle = {
    background: 'var(--bg-card)',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-color)',
  };

  const formGroupStyle = {
    marginBottom: '24px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    transition: 'border-color 0.2s ease',
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--primary-color)',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
    },
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: mode === 'light' ? '#7c3aed' : '#6d28d9',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const faqs = [
    {
      question: 'What is SCS Management?',
      answer: 'SCS Management allows you to control and monitor your Smart Control System devices from a single dashboard.'
    },
    {
      question: 'How do I add a new camera?',
      answer: 'Go to CAMS Management page and click "Add New Camera" button. Follow the setup wizard to connect your camera.'
    },
    {
      question: 'What is the response time for support?',
      answer: 'Our support team typically responds within 2-4 hours during business hours (9 AM - 6 PM, Monday to Friday).'
    },
    {
      question: 'Can I access my devices remotely?',
      answer: 'Yes, you can access and control all your devices remotely through our web portal or mobile app.'
    },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Contact Us</h1>
        <p style={subtitleStyle}>
          Get in touch with our support team for any questions or assistance you may need.
        </p>
      </div>

      {submitted && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid #10b981',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <div>
            <div style={{ fontWeight: '600', color: '#10b981' }}>Message Sent Successfully!</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Our support team will get back to you within 2-4 hours.
            </div>
          </div>
        </div>
      )}

      <div style={gridStyle}>
        {/* Contact Information */}
        <div style={contactInfoStyle}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '24px' }}>
            Get in Touch
          </h2>

          <div style={contactItemStyle}>
            <div style={contactIconStyle}>📧</div>
            <div style={contactTextStyle}>
              <h3 style={contactTitleStyle}>Email</h3>
              <p style={contactDescriptionStyle}>Send us an email anytime</p>
              <p style={contactDetailStyle}>support@customerportal.com</p>
              <p style={contactDetailStyle}>sales@customerportal.com</p>
            </div>
          </div>

          <div style={contactItemStyle}>
            <div style={contactIconStyle}>📞</div>
            <div style={contactTextStyle}>
              <h3 style={contactTitleStyle}>Phone</h3>
              <p style={contactDescriptionStyle}>Call us during business hours</p>
              <p style={contactDetailStyle}>+1 (555) 123-4567</p>
              <p style={contactDetailStyle}>Emergency: +1 (555) 987-6543</p>
            </div>
          </div>

          <div style={contactItemStyle}>
            <div style={contactIconStyle}>🕒</div>
            <div style={contactTextStyle}>
              <h3 style={contactTitleStyle}>Business Hours</h3>
              <p style={contactDescriptionStyle}>Our support team availability</p>
              <p style={contactDetailStyle}>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p style={contactDetailStyle}>Saturday: 10:00 AM - 4:00 PM</p>
              <p style={contactDetailStyle}>Sunday: Closed</p>
            </div>
          </div>

          <div style={contactItemStyle}>
            <div style={contactIconStyle}>📍</div>
            <div style={contactTextStyle}>
              <h3 style={contactTitleStyle}>Location</h3>
              <p style={contactDescriptionStyle}>Visit our headquarters</p>
              <p style={contactDetailStyle}>123 Tech Street</p>
              <p style={contactDetailStyle}>San Francisco, CA 94107</p>
              <p style={contactDetailStyle}>United States</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={formStyle}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '24px' }}>
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={gridStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div style={gridStyle}>
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="subject">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter message subject"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={selectStyle}
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Issue</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Report a Bug</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="message">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={textareaStyle}
                placeholder="Please describe your issue or inquiry in detail..."
              />
            </div>

            <button
              type="submit"
              style={buttonStyle}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        marginTop: '48px',
        background: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '24px' }}>
          Frequently Asked Questions
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                background: 'var(--bg-primary)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: '0 0 12px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ color: 'var(--primary-color)' }}>❓</span>
                {faq.question}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6',
              }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;