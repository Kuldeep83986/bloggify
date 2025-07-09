import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Bloggify</h3>
          <p>
            A platform to share your stories, learn from others, and become part of a creative, thoughtful community.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Twitter</a></li>
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p>Email: support@bloggify.com</p>
          <p>Location: Mumbai, India</p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Bloggify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
