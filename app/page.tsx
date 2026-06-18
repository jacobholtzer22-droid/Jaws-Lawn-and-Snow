import Header from "@/components/Header";
import SeasonHero from "@/components/SeasonHero";
import Services from "@/components/Services";
import Seasons from "@/components/Seasons";
import WhyUs from "@/components/WhyUs";
import ServiceArea from "@/components/ServiceArea";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SeasonHero />
        <Services />
        <Seasons />
        <WhyUs />
        <ServiceArea />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
