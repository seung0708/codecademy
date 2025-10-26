import './ProductCard.css'
import { Link } from "react-router-dom"

const ProductCard = ({ key, product}) => {
    return (
        <div className="product-card" key={key}>
            <img className="product-card__image" src={product.images[0]} alt={product.name} />
            <Link to={`/product/${product.id}`} className="product-card__content">
                <div className="product-card__content__header">
                    <h3 className="product-card__name">{product.name}</h3>
                    <p className="product-card__price">${product.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard