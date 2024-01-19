import { Link } from 'react-router-dom';
import "../css/components/Product.css";

export default function Product({ product }) {
    return (
        <div className="card" style={{ minHeight: "100%", minWidth: "100%", textDecoration: "none" }}>
            <img src={product.imageUrl} className="card-img-top" alt="Product Image" style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate">{product.name}</h6>
                {product.sale > 0 ? (
                    <div className="d-flex justify-content-between card-text text-truncate mt-auto">
                        <del className="card-text text-truncate mt-auto">{product.price}$</del>
                        <p className="card-text text-truncate mt-auto">
                            =&gt;{(product.price * (100 - product.sale) / 100).toLocaleString()}$
                        </p>
                    </div>
                ) : (
                    <p className="card-text text-truncate mt-auto">{product.price.toLocaleString()}$</p>
                )}
            </div>
        </div>
    )
}