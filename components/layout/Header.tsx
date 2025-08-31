import React, { useState } from 'react';
import { Search, Menu, X, User, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccommodation, setActiveAccommodation] = useState('');

  const accommodationTypes = [
    'Rooms',
    'Mansion',
    'Countryside',
    'Apartments',
    'Villas',
    'Cottages',
    'Studios'
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-900 shadow-md sticky top-0 z-50">
      {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Home className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-white">StayFinder</span>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search destinations, properties..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Sign In & Sign Up */}
                    <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-blue-600 font-medium transition-colors duration-200">
                        Sign In
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium">
                        Sign Up
                    </button>
                    </div>

                    {/* User Icon */}
                    <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                    <User className="h-6 w-6 text-white" />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                    onClick={toggleMenu}
                    className="p-2 rounded-md text-white hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Accommodation Types - Desktop */}
            <div className="hidden md:block border-t border-gray-200">
                <div className="flex items-center space-x-8 py-3 overflow-x-auto">
                    {accommodationTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveAccommodation(type)}
                            className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                            activeAccommodation === type
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-white hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* Mobile Search Bar */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search destinations, properties..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Mobile Accommodation Types */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Types of Accommodation</h3>
            <div className="grid grid-cols-2 gap-2">
              {accommodationTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveAccommodation(type);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeAccommodation === type
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="px-4 py-3 space-y-2">
            <button className="w-full text-center py-2 text-white hover:text-blue-600 font-medium transition-colors duration-200">
              Sign In
            </button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;