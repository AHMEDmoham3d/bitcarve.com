import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdvancedTracker from '@/components/AdvancedTracker';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdvancedTracker />
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}