import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        {/* Existing hero section code */}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        {/* Existing features section code */}
      </section>

      {/* Market Overview Section */}
      <section className="py-16 bg-gray-50">
        {/* Existing market overview section code */}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700">
        {/* Existing CTA section code */}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;