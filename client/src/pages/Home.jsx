import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300 text-center px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-4">Welcome to Bloggify</h1>
        <p className="text-lg md:text-xl text-blue-800 max-w-2xl mb-6">
          A creative hub where every voice matters. Share ideas, discover perspectives, and grow your influence.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="py-20 bg-white text-gray-800 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Why Bloggify?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Feature icon="📢" title="Voice Your Thoughts" text="Express freely with our powerful, distraction-free editor." />
          <Feature icon="👥" title="Engage Readers" text="Receive feedback, spark discussions, and build community." />
          <Feature icon="📈" title="Grow Publicly" text="Track your blog growth and reach new audiences every day." />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100 px-6">
        <h2 className="text-4xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Testimonial name="Sara M." quote="This platform made me fall in love with writing again!" />
          <Testimonial name="Dev R." quote="The community is amazing. I’ve learned so much from others." />
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10">Our Growing Community</h2>
        <div className="flex justify-center gap-16 text-blue-600 text-3xl font-semibold">
          <div><p>10K+</p><p className="text-sm text-gray-600">Writers</p></div>
          <div><p>50K+</p><p className="text-sm text-gray-600">Readers</p></div>
          <div><p>2M+</p><p className="text-sm text-gray-600">Words Published</p></div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-500 text-white text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Start Reading & Writing Today</h2>
        <p className="max-w-xl mx-auto mb-6">
          Create a free account and join the thousands of people sharing knowledge, stories, and insights.
        </p>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Sign Up Free
        </Link>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 px-6">
        <h2 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <FAQ question="Is Bloggify free?" answer="Yes, completely free to read and write blogs." />
          <FAQ question="Can I follow other writers?" answer="Absolutely! Engage with other users and follow their content." />
          <FAQ question="Do you support Markdown?" answer="Yes, our editor supports Markdown syntax." />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Reusable feature block
const Feature = ({ icon, title, text }) => (
  <div className="text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

// Reusable testimonial
const Testimonial = ({ name, quote }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <p className="italic mb-4">"{quote}"</p>
    <p className="font-semibold text-gray-800">- {name}</p>
  </div>
);

// Reusable FAQ
const FAQ = ({ question, answer }) => (
  <div>
    <h4 className="text-lg font-semibold mb-1">{question}</h4>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default Home;
