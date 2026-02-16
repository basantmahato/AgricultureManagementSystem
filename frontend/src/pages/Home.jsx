import Hero from "../components/Hero";
import Features from "../components/Features";
import Impact from "../components/Impact";
import AgricultureServices from "../components/AgricultureServices";
import BlogPreview from "../components/BlogPreview";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Features id="features" />
      <AgricultureServices id="services" />
      <Impact />
      <BlogPreview id="blog" />
      <Footer />
    </>
  );
}

export default Home;
