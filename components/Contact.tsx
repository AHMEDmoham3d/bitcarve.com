'use client';

import { useState } from 'react';
import { Send, Phone, Mail, MessageSquare, CheckCircle, AlertCircle, Clock, Shield, Globe } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim(),
          message: formData.message.trim()
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', whatsapp: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error status when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-blue-100 rounded-full mb-4 lg:mb-6">
            <MessageSquare className="w-3 lg:w-4 h-3 lg:h-4 mr-2 text-blue-600" />
            <span className="text-xs lg:text-sm font-medium text-blue-800">Enterprise Consultation</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            Ready to Transform
            <span className="gradient-text block">Your Business?</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Let's discuss your enterprise requirements and create scalable solutions that drive growth. 
            Get a comprehensive consultation and detailed technical proposal.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-4 lg:mb-6">Enterprise Solutions Await</h3>
                <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-6 lg:mb-8">
                  We're here to architect your digital transformation. Our enterprise team is ready to 
                  discuss your technical requirements and provide scalable solutions.
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start space-x-3 lg:space-x-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 lg:w-6 h-5 lg:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1 text-sm lg:text-base">Enterprise Email</h4>
                    <p className="text-sm lg:text-base text-slate-600">7hmedmohamed12@gmail.com</p>
                    <p className="text-xs lg:text-sm text-slate-500">Response within 4 hours during business days</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 lg:space-x-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 lg:w-6 h-5 lg:h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1 text-sm lg:text-base">WhatsApp Business</h4>
                    <p className="text-sm lg:text-base text-slate-600">Instant technical consultation</p>
                    <p className="text-xs lg:text-sm text-slate-500">Available 9 AM - 6 PM GMT+2</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 lg:space-x-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 lg:w-6 h-5 lg:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1 text-sm lg:text-base">Technical Discovery Call</h4>
                    <p className="text-sm lg:text-base text-slate-600">Free 30-minute architecture consultation</p>
                    <p className="text-xs lg:text-sm text-slate-500">Schedule at your convenience</p>
                  </div>
                </div>
              </div>

              {/* Enterprise Features */}
              <div className="bg-white p-4 lg:p-6 rounded-2xl border-2 border-gray-100">
                <h4 className="font-semibold text-slate-800 mb-3 lg:mb-4 text-sm lg:text-base">Enterprise Service Level</h4>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-500 mr-2 lg:mr-3" />
                    <span className="text-xs lg:text-sm text-slate-700">Free technical consultation & architecture review</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-500 mr-2 lg:mr-3" />
                    <span className="text-xs lg:text-sm text-slate-700">Dedicated senior development team</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-500 mr-2 lg:mr-3" />
                    <span className="text-xs lg:text-sm text-slate-700">24/7 monitoring & enterprise support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-500 mr-2 lg:mr-3" />
                    <span className="text-xs lg:text-sm text-slate-700">Multi-region deployment & scaling</span>
                  </div>
                </div>
              </div>

              {/* Service Level Indicators */}
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                <div className="text-center p-3 lg:p-4 bg-white rounded-xl border border-gray-100">
                  <Clock className="w-5 lg:w-6 h-5 lg:h-6 text-blue-600 mx-auto mb-1 lg:mb-2" />
                  <div className="text-lg lg:text-xl font-bold text-slate-800">4h</div>
                  <div className="text-xs lg:text-sm text-slate-600">Response Time</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-white rounded-xl border border-gray-100">
                  <Shield className="w-5 lg:w-6 h-5 lg:h-6 text-green-600 mx-auto mb-1 lg:mb-2" />
                  <div className="text-lg lg:text-xl font-bold text-slate-800">99.9%</div>
                  <div className="text-xs lg:text-sm text-slate-600">Uptime SLA</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-white rounded-xl border border-gray-100">
                  <Globe className="w-5 lg:w-6 h-5 lg:h-6 text-purple-600 mx-auto mb-1 lg:mb-2" />
                  <div className="text-lg lg:text-xl font-bold text-slate-800">15+</div>
                  <div className="text-xs lg:text-sm text-slate-600">Countries</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border-2 border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm lg:text-base"
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm lg:text-base"
                    placeholder="your@company.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm lg:text-base"
                    placeholder="+1234567890"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Project Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none text-sm lg:text-base"
                    placeholder="Describe your project requirements, expected timeline, technical specifications, and any specific features you need..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center p-3 lg:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-green-500 mr-2 lg:mr-3" />
                    <span className="text-xs lg:text-sm text-green-800">Thank you! Your enterprise consultation request has been received. Our technical team will contact you within 4 hours.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center p-3 lg:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 lg:w-5 h-4 lg:h-5 text-red-500 mr-2 lg:mr-3" />
                    <span className="text-xs lg:text-sm text-red-800">{errorMessage || 'Sorry, there was an error sending your message. Please try again or contact us directly.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 pulse-glow text-sm lg:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 lg:h-5 w-4 lg:w-5 border-b-2 border-white mr-2 lg:mr-3"></div>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Request Enterprise Consultation
                      <Send className="ml-2 w-4 lg:w-5 h-4 lg:h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}