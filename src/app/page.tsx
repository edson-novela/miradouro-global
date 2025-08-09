import Hero from "@/components/home/Hero";
import Destionations from "./../components/home/Destinations";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/common/Footer";


export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Destionations />
        <Services />
        <Testimonials />
        <Newsletter />
        <Footer />
      </main>
    </div>
  );
}
