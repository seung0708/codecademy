import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="home">
            <Header />
            <Hero />
            <FeaturedProducts />
            <Footer />
        </div>
    )
}

export default Home
