import {useEffect } from "react";

import Container from "./Container";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
    const fetchProducts = async () => {
        const response = await fetch('../../../routes/products')
        const data = await response.json()
        console.log(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <Container className="featured-products">
            <h2>Featured Products</h2>
            <div className="featured-products__grid">
                {/* {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))} */}
            </div>
        </Container>
    )
}

export default FeaturedProducts
