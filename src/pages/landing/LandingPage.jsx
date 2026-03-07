import Navbar from "./Navbar";
import Hero from "./Hero";
import Problems from "./Problem";
import Features from "./Features";
import HowItWorks from "./Howitworks";
import Pricing from "./Princing";
import Cta from "./Cta";
import Footer from "./Footer";
import Roadmap from "./Roadmap";
import LoginPage from "./Loginpage";

function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.85)} }
      `}</style>
      <Navbar />
      <Hero />
      <Problems />
      <Features />
      <HowItWorks />
      <Pricing />
      <Roadmap />
      <Cta />
      <Footer />
      <LoginPage />
    </>
  );
}

export default LandingPage;