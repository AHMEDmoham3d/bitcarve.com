'use client';

import { Code, Mail, Phone, Globe, Shield, Award, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-6 lg:w-8 h-6 lg:h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Code className="w-3 lg:w-5 h-3 lg:h-5 text-white" />
                </div>
                <div className="absolute -top-0.5 lg:-top-1 -right-0.5 lg:-right-1 w-2 lg:w-3 h-2 lg:h-3 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-lg lg:text-xl font-bold font-poppins">Bitcarve</span>
            </div>
            <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
              Enterprise software development company delivering scalable, secure, and 
              high-performance digital solutions worldwide.
            </p>
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs lg:text-sm text-gray-400">ISO 27001 Certified</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-base lg:text-lg font-semibold">Enterprise Services</h3>
            <ul className="space-y-2 text-sm lg:text-base text-gray-300">
              <li>Custom Web Development</li>
              <li>Cloud Infrastructure</li>
              <li>Database Solutions</li>
              <li>Security Implementation</li>
              <li>24/7 Technical Support</li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-base lg:text-lg font-semibold">Technologies</h3>
            <ul className="space-y-2 text-sm lg:text-base text-gray-300">
              <li>React & Next.js</li>
              <li>Node.js & TypeScript</li>
              <li>AWS & Azure Cloud</li>
              <li>PostgreSQL & MongoDB</li>
              <li>Docker & Kubernetes</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-base lg:text-lg font-semibold">Enterprise Contact</h3>
            <div className="space-y-3 text-sm lg:text-base text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>7hmedmohamed12@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Europe & Gulf Regions</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>24/7 Enterprise Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-xs lg:text-sm text-gray-400 text-center lg:text-left">
              © 2024 Bitcarve. All rights reserved. Enterprise software solutions with precision and excellence.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs lg:text-sm text-gray-400">AWS Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs lg:text-sm text-gray-400">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}