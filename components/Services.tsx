'use client';

import { Code, Palette, Wrench, Smartphone, Globe, Settings, Zap, CheckCircle, Database, Cloud, Shield, Cpu, Monitor, Server } from 'lucide-react';

export default function Services() {
  const currentServices = [
    {
      icon: Code,
      title: "Custom Web Development",
      description: "Full-stack web applications built with modern frameworks and scalable architecture.",
      features: ["React/Next.js", "Node.js Backend", "Database Design", "API Development"],
      technologies: ["TypeScript", "PostgreSQL", "Redis", "Docker"]
    },
    {
      icon: Zap,
      title: "High-Performance Landing Pages",
      description: "Conversion-optimized landing pages with advanced analytics and A/B testing capabilities.",
      features: ["Conversion Focused", "A/B Testing Ready", "Mobile Optimized", "Analytics Integration"],
      technologies: ["Tailwind CSS", "Framer Motion", "Google Analytics", "Hotjar"]
    },
    {
      icon: Database,
      title: "Database & Backend Solutions",
      description: "Robust database design and backend architecture for enterprise-level applications.",
      features: ["Database Design", "API Development", "Microservices", "Performance Optimization"],
      technologies: ["PostgreSQL", "MongoDB", "GraphQL", "Elasticsearch"]
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions with automated deployment and monitoring systems.",
      features: ["AWS/Azure Setup", "CI/CD Pipelines", "Auto Scaling", "Monitoring"],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform"]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security implementation with compliance standards adherence.",
      features: ["SSL/TLS Setup", "Authentication", "Data Encryption", "GDPR Compliance"],
      technologies: ["OAuth 2.0", "JWT", "Bcrypt", "Helmet.js"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "24/7 monitoring, updates, and technical support to keep your systems running smoothly.",
      features: ["24/7 Monitoring", "Security Updates", "Performance Optimization", "Technical Support"],
      highlight: "Most Popular Service",
      technologies: ["New Relic", "Sentry", "Uptime Robot", "Slack Integration"]
    }
  ];

  const futureServices = [
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native iOS and Android apps with cross-platform React Native solutions.",
      timeline: "Coming ",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
      icon: Cpu,
      title: "AI/ML Integration",
      description: "Machine learning models and AI-powered features for intelligent applications.",
      timeline: "Coming ",
      technologies: ["TensorFlow", "PyTorch", "OpenAI API", "Hugging Face"]
    },
    {
      icon: Monitor,
      title: "Desktop Applications",
      description: "Cross-platform desktop applications using modern web technologies.",
      timeline: "Coming",
      technologies: ["Electron", "Tauri", "PWA", "WebAssembly"]
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-blue-100 rounded-full mb-4 lg:mb-6">
            <Settings className="w-3 lg:w-4 h-3 lg:h-4 mr-2 text-blue-600" />
            <span className="text-xs lg:text-sm font-medium text-blue-800">Enterprise Solutions</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            Professional Solutions for
            <span className="gradient-text block">Modern Businesses</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From initial concept to enterprise deployment, we provide comprehensive technology solutions 
            that scale with your business needs.
          </p>
        </div>

        {/* Current Services */}
        <div className="mb-16 lg:mb-20">
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 lg:mb-8 text-center">Available Now</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-6 lg:p-8 hover:border-blue-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  {service.highlight && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-2 lg:px-3 py-1 rounded-bl-lg">
                      Popular
                    </div>
                  )}
                  
                  <div className="mb-4 lg:mb-6">
                    <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                    </div>
                    <h4 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2 lg:mb-3">{service.title}</h4>
                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-500 mr-2 lg:mr-3 flex-shrink-0" />
                        <span className="text-sm lg:text-base text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Stack */}
                  <div className="border-t border-gray-100 pt-3 lg:pt-4">
                    <p className="text-xs lg:text-sm font-semibold text-slate-600 mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-1 lg:gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {service.highlight && (
                    <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs lg:text-sm text-amber-800 font-medium">{service.highlight}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Services */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-6 lg:p-8 xl:p-12">
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 lg:mb-4">Expanding Our Capabilities</h3>
            <p className="text-sm lg:text-base text-slate-600">Next-generation solutions coming soon</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {futureServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/50 relative"
                >
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2 lg:px-3 py-1 rounded-full">
                    {service.timeline}
                  </div>
                  
                  <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-r from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center mb-4 lg:mb-6">
                    <IconComponent className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                  </div>
                  
                  <h4 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2 lg:mb-3">{service.title}</h4>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-3 lg:mb-4">{service.description}</p>
                  
                  {/* Future Technology Stack */}
                  <div className="border-t border-gray-200 pt-3 lg:pt-4">
                    <p className="text-xs lg:text-sm font-semibold text-slate-600 mb-2">Planned Technologies:</p>
                    <div className="flex flex-wrap gap-1 lg:gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 lg:mt-16">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 pulse-glow text-sm lg:text-base"
          >
            Start Your Project Today
            <Code className="ml-2 w-4 lg:w-5 h-4 lg:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}