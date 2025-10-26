import './FeaturedProducts.css';

import {useState, useEffect } from "react";

import Container from "../Container/Container";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:3000/products`)
        if (!response.ok) {
            throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        const randomProducts = data.sort(() => Math.random() - 0.5).slice(0, 3)
        setProducts(randomProducts)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <Container className="featured-products">
            <h2 className="featured-products__title">Featured Products</h2>
            <div className="featured-products__grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Container>
    )
}

export default FeaturedProducts
