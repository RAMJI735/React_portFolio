import React, { useState } from 'react';
import { mailService } from '../../services/mailService';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import data from "../../portfolioData.json";
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function Contact() {
  const {sections}= data;
  const [isloading,setIsloading]= useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    try {
      setIsloading(true);
         e.preventDefault();
    console.log(formData);
    // alert("Message sent!");
     const res = await mailService.post(formData);
    if (res.success == true) {
      toast.success(res.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    else {
      toast.error(res.message);
    }
    } catch (error) {
      throw error;
    } finally {
      setIsloading(false);
    }
 
  };


  const socialIcons ={
    FaInstagram:<FaInstagram/>,
    FaTwitter:<FaTwitter/>,
    FaFacebookF:<FaFacebookF/>
  }



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl font-bold mb-5">Contact Us</h1>
      <p className="text-center mb-10 text-gray-600 max-w-xl">
        Have any questions or want to work with us? Fill out the form below and we’ll get back to you soon.
      </p>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{sections.contact.content}</h2>
            <p className="text-gray-700 mb-2">📍{sections.contact.address}</p>
            <p className="text-gray-700 mb-2">📞 {sections.contact.number}</p>
            <p className="text-gray-700 mb-2">✉️ {sections.contact.email}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4">
              {sections.contact.social.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
          
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <Button
            // onClick={SendMailFun}
            endIcon={isloading && <CircularProgress size={20}/>}
            type="submit"
            color="primary"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </Button>

        </form>
      </div>

      {/* Optional Map */}
      <div className="w-full max-w-4xl mt-10 h-64">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Tahipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full rounded-lg border-0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
