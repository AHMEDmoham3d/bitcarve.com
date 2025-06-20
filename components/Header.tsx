'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 py-2">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-x-3">
            <Image
              src="/logo12.png"
              alt="Bitcarve Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-base text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-base text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-base text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Get Quote
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-2">
            <nav className="flex flex-col gap-y-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-left w-fit"
              >
                Get Quote
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
