import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';
import contactGif from './contact_gif.gif';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MessageIcon from '@mui/icons-material/Message';

//  install axios 
//        npm i axios
//  install material ui icons
//        npm install @mui/icons-material
// install styled components
// npm install @mui/material @emotion/react @emotion/styled



const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add current date and time
    const timestamp = new Date().toISOString();
  
    // for post paste the base id(from api documentation) of the created base and also the table name
    try {
      const response = await axios.post('https://api.airtable.com/v0/app85ORZAhkKUcJuC/Submissions', {
        fields: {
          'Name': formData.name,
          'Email': formData.email,
          'Message': formData.message,
          'Date of Submission': timestamp // Add the timestamp field
        }
      }, {
        // For authorization create a token in the airtable for the created base
        headers: {
          'Authorization': `Bearer patL8NYBCfggXIR0C.397756327be6d8a9653a23434e6f841990e4270d892f2dd8389f7664408aef42`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        alert('Submission successful!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      console.error(error);
      alert('Submission failed! Please try again.');
    }
  };
  

  return (
    <div className="contact-container">
      <div className="wavy-section">
        <h2>Have Some Question?</h2>
        <p>
          Thank you for your interest in our services. Please fill out the
          form below or e-mail us at<br/>
          <a href="mailto:hello@greenink.pro">hello@greenink.pro</a> and we will get back to you
          promptly regarding your request.
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <img src={contactGif} 
            alt="Contact GIF" 
            className="contact-gif"
            style={{
              overflow: 'visible',
              width: '400px', height:'auto',
              position: 'relative', 
              bottom: '60px',
              clipPath: 'circle(50% at center)',
              left: '0'
            }}
          />
          <div className="get-in-touch">
            <h2>Get in touch</h2>
            <p>
              <PhoneIcon /> +919747976278
            </p>
            <p>
              <EmailIcon /> hello@greenink.pro
            </p>
            <p>
              <LocationOnIcon /> Malabar Innovation Entrepreneurship Zone<br/>MiZone, Building #446, Kannur, Kerala, India - 670567
            </p>
          </div>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <PersonIcon /> Name
              </label>
              <input
                type="text"
                placeholder='Enter your name'
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <EmailOutlinedIcon /> Email
              </label>
              <input
                type="email"
                placeholder='Enter your email'
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                <MessageIcon /> Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder='Enter your message or query'
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
