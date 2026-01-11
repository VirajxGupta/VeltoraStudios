import SmoothScroll from './components/layout/SmoothScroll';
import SoftCursor from './components/ui/SoftCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Work from './components/sections/Work';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';

function App() {
  return (
    <SmoothScroll>
      <SoftCursor />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Process />
        <Work />
        <CTA />
        <Footer />
      </main>

      {/* Background grain/noise for texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </SmoothScroll>
  );
}

export default App;
