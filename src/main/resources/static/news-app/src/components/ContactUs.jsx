import React, { useContext } from 'react'
import './ContactUs.css';
import ThemeContext from '../context/ThemeContext';
import { Navigate } from 'react-router-dom';

const ContactUs = (props) => {
  props.toggleHeaderVisibility(true);

  const themeContext = useContext(ThemeContext);
  themeContext.setMinHeight('min-height-100vh');
  if (!props.jwt) {
    return <Navigate to="/" replace />;
}
  return (
    <div className="my-5" style={{ color: 'white', backgroundColor: 'black', textAlign: 'center', padding: '2vw' }}>
      <h2>Reach Out To Us</h2>
      <p>We value your feedback, questions, and suggestions. Please feel free to reach out to us using the contact information provided below.
        Our team is here to assist you and address any inquiries you may have.</p>
      <div className="inner-container">
        <h3>General Inquiries</h3>
        <p>
          For general inquiries or assistance, please contact our customer support team:
          <ul>
            <li><b>Email: </b> <a href="mailto:furygeneralinquiries@furynewsapp.com">furygeneralinquiries@furynewsapp.com</a></li>
            <li><b>Phone: </b>(+1) 555-555-5555 (Monday-Friday, 9am-5pm)</li>
          </ul>
        </p>
      </div>
      <div className="inner-container">
        <h3>Technical Support</h3>
        <p>
          If you require technical assistance or encounter any issues while using our platform, our technical support team is available to help:
          <ul>
            <li><b>Email: </b> <a href="mailto:furytechnicalsupport@furynewsapp.com">furytechnicalsupport@furynewsapp.com</a></li>
            <li><b>Phone: </b>(+1) 655-555-5555 (Monday-Friday, 9am-5pm)</li>
          </ul>
        </p>
      </div>
    </div>
  )
}

export default ContactUs;
