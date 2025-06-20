'use client';

import { Shield, Clock, Globe, Users, Award, Zap, CheckCircle, Star, Code2, Database, Cloud, Cpu } from 'lucide-react';

export default function About() {
  const advantages = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level security protocols with SOC 2 compliance, end-to-end encryption, and regular security audits."
    },
    {
      icon: Clock,
      title: "Agile Development Process",
      description: "Rapid deployment using CI/CD pipelines, automated testing, and DevOps best practices for faster delivery."
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Multi-region cloud deployment with CDN optimization serving clients across Europe, Gulf, and beyond."
    },
    {
      icon: Users,
      title: "Dedicated Development Teams",
      description: "Senior developers with 5+ years experience, certified in modern frameworks and cloud technologies."
    },
    {
      icon: Award,
      title: "Industry Certifications",
      description: "AWS Certified, Google Cloud Partner, and Microsoft Azure certified development team."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Sub-second load times, 99.9% uptime SLA, and scalable architecture handling millions of requests."
    }
  ];

  const stats = [
    { number: "50+", label: "Enterprise Projects", icon: CheckCircle },
    { number: "15+", label: "Countries Served", icon: Globe },
    { number: "99.9%", label: "Uptime SLA", icon: Star },
    { number: "24/7", label: "Technical Support", icon: Clock }
  ];

  const certifications = [
    { name: "AWS Certified", icon: Cloud, color: "text-orange-500" },
    { name: "Google Cloud", icon: Database, color: "text-blue-500" },
    { name: "Microsoft Azure", icon: Cpu, color: "text-blue-600" },
    { name: "ISO 27001", icon: Shield, color: "text-green-500" }
  ];

  return (
    <section id="about" className="py-16 lg:py-20 geometric-bg text-white relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-cube absolute top-10 right-4 lg:right-10 w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"></div>
        <div className="floating-cube absolute bottom-20 left-4 lg:left-10 w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl"></div>
        <div className="floating-cube absolute top-1/2 left-1/4 w-8 lg:w-12 h-8 lg:h-12 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-blue-600/20 rounded-full border border-blue-400/30 mb-4 lg:mb-6">
            <Award className="w-3 lg:w-4 h-3 lg:h-4 mr-2 text-blue-400" />
            <span className="text-xs lg:text-sm font-medium text-blue-200">Enterprise Software Company</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
            Your Technology Partner for
            <span className="gradient-text block">Digital Transformation</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're not just developers – we're technology architects building the future of digital business. 
            Our enterprise-grade solutions power companies across multiple industries worldwide.
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-lg lg:text-xl font-bold text-center mb-6 lg:mb-8 text-gray-300">Industry Certifications & Partnerships</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <div key={index} className="glass-effect rounded-xl p-4 lg:p-6 text-center">
                  <IconComponent className={`w-8 lg:w-10 h-8 lg:h-10 mx-auto mb-2 lg:mb-3 ${cert.color}`} />
                  <div className="text-sm lg:text-base font-semibold text-white">{cert.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-16 lg:mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <IconComponent className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-1 lg:mb-2">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-300 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                </div>
                
                <h3 className="text-lg lg:text-2xl font-bold mb-3 lg:mb-4 text-white">{advantage.title}</h3>
                <p className="text-sm lg:text-base text-gray-300 leading-relaxed">{advantage.description}</p>
              </div>
            );
          })}
        </div>

        {/* Technical Expertise */}
        <div className="mt-16 lg:mt-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-6 lg:p-8 xl:p-12 border border-blue-400/30">
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Technical Expertise</h3>
            <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
              Our development team masters the latest technologies and frameworks
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <Code2 className="w-12 lg:w-16 h-12 lg:h-16 text-blue-400 mx-auto mb-3 lg:mb-4" />
              <h4 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3">Frontend Development</h4>
              <p className="text-sm lg:text-base text-gray-300">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>
            <div className="text-center">
              <Database className="w-12 lg:w-16 h-12 lg:h-16 text-green-400 mx-auto mb-3 lg:mb-4" />
              <h4 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3">Backend & Database</h4>
              <p className="text-sm lg:text-base text-gray-300">Node.js, PostgreSQL, MongoDB, Redis</p>
            </div>
            <div className="text-center">
              <Cloud className="w-12 lg:w-16 h-12 lg:h-16 text-orange-400 mx-auto mb-3 lg:mb-4" />
              <h4 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3">Cloud & DevOps</h4>
              <p className="text-sm lg:text-base text-gray-300">AWS, Docker, Kubernetes, CI/CD</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 lg:p-8 xl:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Ready to Scale Your Business?</h3>
            <p className="text-lg lg:text-xl text-blue-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
              Join industry leaders who trust Bitcarve with their mission-critical applications.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-all duration-200 pulse-glow text-sm lg:text-base"
            >
              Schedule Enterprise Consultation
              <Award className="ml-2 w-4 lg:w-5 h-4 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}