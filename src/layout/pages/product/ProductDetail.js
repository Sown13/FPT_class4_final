import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ProductService from "../../../service/ProductService";
import CartService from "../../../service/CartService";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('currentUser') !== null) {
            const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
            console.log(loggedUser.firstname);
            setCurrentUser(loggedUser);
        };
        ProductService.getProductById(productId).then((res) => {
            setProduct(res.data);
        }).catch(error => console.error('Failed to get product detail', error))
    }, [productId])

    const addToCart = () => {
        if (currentUser !== null) {
            const productDataToAdd = {
                userId: currentUser.id,
                productId: product.id,
                quantity: 1
            }
            CartService.addProductToCart(productDataToAdd).then(() => {
                alert(`Added Successfully!` + JSON.stringify(productDataToAdd));
            }).catch(error => console.error('Failed to get product detail', error));
        } else { navigate("/login") }
    }

    return (
        <div>
            <div class="container" style={{ marginBottom: "20px" }}>
                <h1 class="mt-4">{product.name}</h1>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <h3>Description</h3>
                        <ul>
                            {product.description}
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <img src={product.imageUrl} alt="Product" class="img-fluid" />
                    </div>
                    <div>Price: {product.price}</div>
                    <div>Quantity Left: {product.quantity}</div>
                    <div>Quantity Sold: xxx</div>
                    <button class="btn btn-primary" type="button" onClick={addToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}