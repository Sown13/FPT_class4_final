import { Link } from 'react-router-dom';
import "../css/components/Product.css";

export default function Product({ product }) {
    return (
        <div className="card" style={{ minHeight: "242px", minWidth: "195px", textDecoration: "none" }}>
            <img src="https://www.telegraph.co.uk/content/dam/news/2023/05/23/TELEMMGLPICT000336809344_16848508364990_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=960" className="card-img-top" alt="Product Image" />
            <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate ">{product.name}</h6>
                {product.sale > 0 ?
                    <div className="d-flex justify-content-between card-text text-truncate mt-auto">
                        <del className='card-text text-truncate mt-auto'>{product.price}$</del>
                        <p className='card-text text-truncate mt-auto'> =&gt;{product.price * (100 - product.sale) / 100}$</p>
                    </div>
                    :
                    <p className='card-text text-truncate mt-auto'>{product.price}$</p>
                }

            </div>
        </div>
    )
}