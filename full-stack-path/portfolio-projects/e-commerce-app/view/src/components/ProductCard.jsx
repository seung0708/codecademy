const ProductCard = ({ key, product}) => {
    console.log(product)
    return (
        <div className="product-card" key={key}>
            <img className="product-card__image" src={product.images[0]} alt={product.name} />
            <div className="product-card__content">
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__price">${product.price}</p>
            </div>
        </div>
    )
}

export default ProductCard