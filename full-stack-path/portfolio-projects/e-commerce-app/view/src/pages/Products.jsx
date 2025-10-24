import {useState, useEffect} from "react";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:3000/products`)
        if (!response.ok) {
            throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        setProducts(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <Container className="products">
            <h1>Products</h1>
            <div className="products__grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Container>
    )
}

export default Products