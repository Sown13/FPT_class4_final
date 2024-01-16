import { useEffect, useState } from "react"
import ProductService from "../../service/ProductService";
import Product from "../../components/Product";
import { Link } from "react-router-dom";

export default function Home() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then((res) => {
            setProductList(res.data);
        }).catch((err) => { console.error("Failed to fetch ", err) });
    }, [])

    return (
        <div>
            <h1 >All the Products today</h1>
            <div style={{ color: "#f53d2d", height: "4px", backgroundColor: "#f53d2d", marginBottom: "10px" }}></div>
            <div className="row">
                {productList.map((product, index) => (
                    product.isActive &&
                    (<Link className="col-lg-2 col-md-4 col-sm-12" style={{ marginBottom: "10px", textDecoration: "none" , paddingRight:"0"}} key={index}>
                        <Product product={product}> </Product>
                    </Link>)
                ))}
            </div>
        </div>

    )
}