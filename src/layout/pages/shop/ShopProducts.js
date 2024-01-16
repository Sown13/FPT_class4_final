import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";
import Product from "../../../components/Product";
import { Link, Outlet } from "react-router-dom";

export default function ShopProducts() {
    const [productList, setProductList] = useState([]);
    const userTest = "sonson2"

    const fetchProductsData = () => {
        ProductService.getProductsByUser(userTest).then((res) => {
            setProductList(res.data);
        }).catch((err) => { console.error("Failed to fetch ", err) });
    }

    useEffect(() => {
        fetchProductsData();
    }, [])

    const activeProduct = (condition, productId) => {
        const product = {
            "id": productId,
            "isActive": condition
        }
        ProductService.updateProduct(product).then((res) => {
            fetchProductsData();
        }).catch((err) => { console.error("Failed to active ", err) })
    }

    const deleteProduct = (productId) => {
        ProductService.removeProduct(productId)
            .then((res) => {
                fetchProductsData();
                console.log("Product deleted");
            })
            .catch((err) => { console.error("Failed to delete product ", err) });
    }

    return (
        <div>
            <div style={{ color: "#f53d2d", height: "4px", backgroundColor: "#f53d2d", marginBottom: "10px" }}></div>
            <h3>Manage Products</h3>
            <table class="table table-striped col" >
                <thead>
                    <tr>
                        <th className="col-auto" scope="col">#</th>
                        <th className="col-2" scope="col">Name</th>
                        <th className="col-1" scope="col">Image URL</th>
                        <th className="col-1" scope="col">Type</th>
                        <th className="col-3" scope="col">Description</th>
                        <th className="col-1" scope="col">Price</th>
                        <th className="col-1" scope="col">Sale Ratio</th>
                        <th className="col-1" scope="col">Quantity</th>
                        <th className="col-1" scope="col">Active</th>
                        <th className="col-1" scope="col"> Action </th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {productList.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>URL</td>
                            <td>{product.type}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.sale}</td>
                            <td>{product.quantity}</td>
                            <td>{product.isActive ? <button onClick={() => activeProduct(false, product.id)} className="btn" style={{ backgroundColor: "#ee4d2d", borderColor: "white", color: "white" }}>Yes</button>
                                : <button onClick={() => activeProduct(true, product.id)} className="btn btn-secondary">No</button>}</td>
                            <td className="row">
                                <Link className="btn btn-primary col-6" to={"/shop/edit"} state={{ product: product }} ><i class="fa-solid fa-wrench"></i></Link>
                                <button className="btn col-6" style={{ backgroundColor: "red", borderColor: "white" }} onClick={() => deleteProduct(product.id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}