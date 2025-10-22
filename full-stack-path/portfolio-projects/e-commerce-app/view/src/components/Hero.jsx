import Container from "./Container";
import { Link } from "react-router-dom";

const images = [
    "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
    "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
    "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
    "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp",
    "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
    "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
]

const Hero = () => {
    return (
        <Container className="hero">
            <div className="hero__content">
                <h1>Shop the latest fashion</h1>
                <div className="hero__content__cta">
                    <Link to="/products">Shop now</Link>
                </div>
            </div>
            <div className="hero__images">
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt="" />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Hero