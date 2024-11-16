import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Globe2 className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">TradePro</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Trade with confidence on the world's leading social trading platform
            </p>
            <div className="mt-4 flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Trading</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/forex" className="text-gray-400 hover:text-white text-sm">Forex</Link></li>
              <li><Link to="/crypto" className="text-gray-400 hover:text-white text-sm">Cryptocurrency</Link></li>
              <li><Link to="/stocks" className="text-gray-400 hover:text-white text-sm">Stocks</Link></li>
              <li><Link to="/indices" className="text-gray-400 hover:text-white text-sm">Indices</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white text-sm">Careers</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white text-sm">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
              <li><Link to="/risk" className="text-gray-400 hover:text-white text-sm">Risk Disclosure</Link></li>
              <li><Link to="/compliance" className="text-gray-400 hover:text-white text-sm">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} TradePro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;