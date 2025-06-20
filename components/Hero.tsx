'use client';

import { ArrowRight, Globe, Smartphone, Palette, Code2, Database, Cloud, Shield } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    { name: 'React', color: 'text-blue-400' },
    { name: 'Next.js', color: 'text-gray-300' },
    { name: 'Node.js', color: 'text-green-400' },
    { name: 'TypeScript', color: 'text-blue-300' },
    { name: 'AWS', color: 'text-orange-400' },
    { name: 'Docker', color: 'text-blue-500' }
  ];

  return (
    <section id="hero" className="pt-16 geometric-bg text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-cube absolute top-20 left-4 lg:left-10 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transform-3d"></div>
        <div className="floating-cube absolute top-40 right-4 lg:right-20 w-8 lg:w-12 h-8 lg:h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg transform-3d"></div>
        <div className="floating-cube absolute bottom-40 left-4 lg:left-20 w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg transform-3d"></div>
        <div className="floating-cube absolute bottom-20 right-4 lg:right-10 w-10 lg:w-14 h-10 lg:h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg transform-3d"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
<div className="inline-flex items-center px-3 lg:px-4 py-2 bg-blue-600/20 rounded-full border border-blue-400/30 mt-10">
  <Globe className="w-3 lg:w-4 h-3 lg:h-4 mr-2 text-blue-400" />
  <span className="text-xs lg:text-sm font-medium text-blue-200">
    Enterprise Software Solutions
  </span>
</div>

              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Professional 
                <span className="gradient-text block">Web Development</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-300">for Your Business</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your digital presence with cutting-edge web solutions. We create stunning, 
                high-performance websites that drive results and elevate your brand globally.
              </p>
            </div>

            {/* Technology Stack */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/10">
              <h3 className="text-sm lg:text-base font-semibold text-gray-300 mb-3 lg:mb-4">Our Technology Stack</h3>
              <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-gray-800/50 rounded-full text-xs lg:text-sm font-medium ${tech.color} border border-gray-700/50`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-200 pulse-glow group text-sm lg:text-base"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-4 lg:w-5 h-4 lg:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 border-2 border-white/30 hover:bg-white/10 rounded-lg font-semibold transition-all duration-200 text-sm lg:text-base"
              >
                View Services
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 lg:space-x-8 pt-6 lg:pt-8">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-blue-400">50+</div>
                <div className="text-xs lg:text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-blue-400">15+</div>
                <div className="text-xs lg:text-sm text-gray-400">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-blue-400">99%</div>
                <div className="text-xs lg:text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Website Mockup */}
          <div className="relative perspective-1000 mt-8 lg:mt-0">
            <div className="website-mockup bg-white rounded-xl shadow-2xl overflow-hidden max-w-lg mx-auto lg:max-w-none">
              <div className="bg-gray-100 p-3 lg:p-4 border-b flex items-center space-x-2">
                <div className="w-2 lg:w-3 h-2 lg:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 lg:w-3 h-2 lg:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 lg:w-3 h-2 lg:h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-white rounded px-3 lg:px-4 py-1 text-xs text-gray-600 ml-4">
                  https://bitcarve.com
                </div>
              </div>
              
              <div className="p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Code2 className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm lg:text-base">Enterprise Solutions</h3>
                      <p className="text-xs lg:text-sm text-gray-600">Scalable & Secure</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 lg:space-y-3">
                    <div className="h-3 lg:h-4 bg-blue-200 rounded-full"></div>
                    <div className="h-3 lg:h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-3 lg:h-4 bg-gray-200 rounded-full w-1/2"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                      <Database className="w-4 lg:w-6 h-4 lg:h-6 text-blue-600 mb-2" />
                      <div className="h-1.5 lg:h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="h-1.5 lg:h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                      <Cloud className="w-4 lg:w-6 h-4 lg:h-6 text-green-600 mb-2" />
                      <div className="h-1.5 lg:h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="h-1.5 lg:h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional 3D cubes around mockup */}
            <div className="absolute -top-2 lg:-top-4 -left-2 lg:-left-4 w-6 lg:w-8 h-6 lg:h-8 cube-3d bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-80"></div>
            <div className="absolute -bottom-2 lg:-bottom-4 -right-2 lg:-right-4 w-4 lg:w-6 h-4 lg:h-6 cube-3d bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  );
}